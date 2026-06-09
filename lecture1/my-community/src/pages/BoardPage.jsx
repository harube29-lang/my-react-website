import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box, Typography, Button, Card, CardContent, CardMedia, CardActionArea,
  Chip, Stack, Grid, Avatar, IconButton, Tab, Tabs, Divider,
  CircularProgress, Container, Badge
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import LogoutIcon from '@mui/icons-material/Logout'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ChatBubbleOutlinedIcon from '@mui/icons-material/ChatBubbleOutlined'
import VisibilityIcon from '@mui/icons-material/Visibility'
import WhatshotIcon from '@mui/icons-material/Whatshot'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import RestaurantIcon from '@mui/icons-material/Restaurant'
import { supabase } from '../utils/supabase'

const DISTRICTS = ['전체', '동구', '중구', '남구', '울주군', '북구']

const timeAgo = (iso) => {
  const diff = Date.now() - new Date(iso).getTime()
  const m = Math.floor(diff / 60000)
  if (m < 1) return '방금 전'
  if (m < 60) return `${m}분 전`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h}시간 전`
  const d = Math.floor(h / 24)
  return `${d}일 전`
}

const BoardPage = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [posts, setPosts] = useState([])
  const [district, setDistrict] = useState('전체')
  const [sortBy, setSortBy] = useState('recent')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) { navigate('/login'); return }
      setUser(user)
      supabase.from('profiles').select('username').eq('id', user.id).single()
        .then(({ data }) => setProfile(data))
    })
  }, [navigate])

  const fetchPosts = useCallback(async () => {
    setLoading(true)
    let query = supabase
      .from('posts')
      .select('id, title, content, image_url, district, hashtags, views, created_at, user_id, profiles(username)')
    if (district !== '전체') query = query.eq('district', district)
    query = sortBy === 'recent'
      ? query.order('created_at', { ascending: false })
      : query.order('views', { ascending: false })

    const { data } = await query.limit(30)
    if (data) {
      const ids = data.map(p => p.id)
      const [{ data: likesData }, { data: commentsData }] = await Promise.all([
        supabase.from('likes').select('post_id').in('post_id', ids),
        supabase.from('comments').select('post_id').in('post_id', ids),
      ])
      const likesMap = {}, commentsMap = {}
      likesData?.forEach(l => { likesMap[l.post_id] = (likesMap[l.post_id] || 0) + 1 })
      commentsData?.forEach(c => { commentsMap[c.post_id] = (commentsMap[c.post_id] || 0) + 1 })
      setPosts(data.map(p => ({ ...p, likeCount: likesMap[p.id] || 0, commentCount: commentsMap[p.id] || 0 })))
    }
    setLoading(false)
  }, [district, sortBy])

  useEffect(() => { if (user) fetchPosts() }, [user, fetchPosts])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/login')
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#FAF7F2' }}>

      {/* 상단 헤더 */}
      <Box sx={{ bgcolor: '#fff', borderBottom: '1px solid #eee', position: 'sticky', top: 0, zIndex: 100 }}>
        <Container maxWidth="lg">
          <Stack direction="row" alignItems="center" justifyContent="space-between" py={1.5}>
            <Typography variant="h6" fontWeight={900} color="primary" sx={{ cursor: 'pointer' }} onClick={() => navigate('/board')}>
              🍵 ULSAN TastePick
            </Typography>
            <Stack direction="row" alignItems="center" spacing={1.5}>
              <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main', fontSize: 14, fontWeight: 700 }}>
                {profile?.username?.[0]?.toUpperCase()}
              </Avatar>
              <Typography variant="body2" fontWeight={600} sx={{ display: { xs: 'none', sm: 'block' } }}>
                {profile?.username}님
              </Typography>
              <Button
                variant="contained"
                size="small"
                startIcon={<AddIcon />}
                onClick={() => navigate('/create')}
                sx={{ borderRadius: 2, fontWeight: 700 }}
              >
                글쓰기
              </Button>
              <IconButton size="small" onClick={handleLogout} title="로그아웃">
                <LogoutIcon fontSize="small" />
              </IconButton>
            </Stack>
          </Stack>
        </Container>
      </Box>

      {/* 환영 배너 */}
      <Box sx={{ background: 'linear-gradient(135deg, #7C9A6D 0%, #5a7a52 100%)', color: '#fff', py: 3 }}>
        <Container maxWidth="lg">
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Box>
              <Typography variant="h5" fontWeight={800}>
                {profile?.username}님, 환영합니다! 👋
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.85, mt: 0.5 }}>
                오늘 울산에서 어떤 맛집을 발견하셨나요?
              </Typography>
            </Box>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => navigate('/create')}
              sx={{ bgcolor: '#E9C46A', color: '#333', fontWeight: 700, '&:hover': { bgcolor: '#d4ad45' }, display: { xs: 'none', sm: 'flex' }, borderRadius: 3 }}
            >
              게시물 추가
            </Button>
          </Stack>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 3 }}>

        {/* 지역 카테고리 탭 */}
        <Box sx={{ bgcolor: '#fff', borderRadius: 3, p: 2, mb: 2, boxShadow: '0 1px 8px rgba(0,0,0,0.06)' }}>
          <Stack direction="row" spacing={1} flexWrap="wrap">
            {DISTRICTS.map(d => (
              <Chip
                key={d}
                label={d === '전체' ? '📍 전체' : `📍 ${d}`}
                onClick={() => setDistrict(d)}
                sx={{
                  mb: 0.5,
                  fontWeight: 600,
                  bgcolor: district === d ? 'primary.main' : '#f5f5f5',
                  color: district === d ? '#fff' : '#555',
                  '&:hover': { bgcolor: district === d ? 'primary.dark' : '#ebebeb' },
                  cursor: 'pointer',
                }}
              />
            ))}
          </Stack>
        </Box>

        {/* 정렬 탭 */}
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
          <Tabs
            value={sortBy}
            onChange={(_, v) => setSortBy(v)}
            textColor="primary"
            indicatorColor="primary"
            sx={{ minHeight: 0, '& .MuiTab-root': { minHeight: 40, py: 0.5, fontWeight: 700 } }}
          >
            <Tab icon={<AccessTimeIcon sx={{ fontSize: 16 }} />} iconPosition="start" label="최신순" value="recent" />
            <Tab icon={<WhatshotIcon sx={{ fontSize: 16 }} />} iconPosition="start" label="인기순" value="popular" />
          </Tabs>
          <Typography variant="caption" color="text.secondary">
            게시물 {posts.length}개
          </Typography>
        </Stack>

        <Divider sx={{ mb: 3 }} />

        {/* 게시물 목록 */}
        {loading ? (
          <Box display="flex" justifyContent="center" py={10}><CircularProgress color="primary" /></Box>
        ) : posts.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 10, bgcolor: '#fff', borderRadius: 3 }}>
            <RestaurantIcon sx={{ fontSize: 64, color: '#ddd', mb: 2 }} />
            <Typography variant="h6" color="text.secondary" fontWeight={600}>아직 게시물이 없어요</Typography>
            <Typography variant="body2" color="text.secondary" mb={3}>울산 첫 번째 맛집을 공유해보세요!</Typography>
            <Button variant="contained" startIcon={<AddIcon />} onClick={() => navigate('/create')}>
              첫 게시물 작성하기
            </Button>
          </Box>
        ) : (
          <Grid container spacing={2}>
            {posts.map(post => (
              <Grid item xs={12} sm={6} md={4} key={post.id}>
                <Card
                  sx={{
                    height: '100%', cursor: 'pointer',
                    transition: 'transform 0.15s, box-shadow 0.15s',
                    '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 8px 24px rgba(124,154,109,0.2)' }
                  }}
                  onClick={() => navigate(`/post/${post.id}`)}
                >
                  {/* 썸네일 */}
                  {post.image_url ? (
                    <CardMedia component="img" height={180} image={post.image_url} alt={post.title} sx={{ objectFit: 'cover' }} />
                  ) : (
                    <Box sx={{ height: 140, bgcolor: '#f5ede4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <RestaurantIcon sx={{ fontSize: 48, color: '#ccc' }} />
                    </Box>
                  )}
                  <CardContent sx={{ pb: '12px !important' }}>
                    {/* 지역 + 해시태그 */}
                    <Stack direction="row" spacing={0.5} mb={1} flexWrap="wrap">
                      {post.district && (
                        <Chip label={post.district} size="small" color="primary" sx={{ fontWeight: 700, fontSize: '0.7rem', height: 22 }} />
                      )}
                      {post.hashtags?.slice(0, 2).map(tag => (
                        <Chip key={tag} label={`#${tag}`} size="small" sx={{ bgcolor: '#FFF8E7', color: '#A67C52', fontSize: '0.7rem', height: 22 }} />
                      ))}
                    </Stack>

                    {/* 제목 */}
                    <Typography variant="subtitle1" fontWeight={700} noWrap mb={0.5}>
                      {post.title}
                    </Typography>

                    {/* 내용 미리보기 */}
                    <Typography variant="body2" color="text.secondary" sx={{
                      display: '-webkit-box', WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: 1.5, mb: 1.5
                    }}>
                      {post.content}
                    </Typography>

                    <Divider sx={{ mb: 1.5 }} />

                    {/* 작성자 + 시간 */}
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                      <Stack direction="row" alignItems="center" spacing={0.8}>
                        <Avatar sx={{ width: 22, height: 22, bgcolor: 'secondary.main', fontSize: 11, fontWeight: 700 }}>
                          {post.profiles?.username?.[0]?.toUpperCase()}
                        </Avatar>
                        <Typography variant="caption" fontWeight={600}>{post.profiles?.username}</Typography>
                        <Typography variant="caption" color="text.secondary">· {timeAgo(post.created_at)}</Typography>
                      </Stack>
                    </Stack>

                    {/* 통계 */}
                    <Stack direction="row" spacing={1.5} mt={1}>
                      <Stack direction="row" alignItems="center" spacing={0.3}>
                        <FavoriteIcon sx={{ fontSize: 13, color: '#e57373' }} />
                        <Typography variant="caption" color="text.secondary">{post.likeCount}</Typography>
                      </Stack>
                      <Stack direction="row" alignItems="center" spacing={0.3}>
                        <ChatBubbleOutlinedIcon sx={{ fontSize: 13, color: 'text.secondary' }} />
                        <Typography variant="caption" color="text.secondary">{post.commentCount}</Typography>
                      </Stack>
                      <Stack direction="row" alignItems="center" spacing={0.3}>
                        <VisibilityIcon sx={{ fontSize: 13, color: 'text.secondary' }} />
                        <Typography variant="caption" color="text.secondary">{post.views}</Typography>
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  )
}

export default BoardPage
