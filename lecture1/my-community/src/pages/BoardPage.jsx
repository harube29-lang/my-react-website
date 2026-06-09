import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box, Typography, Button, Card, CardContent, CardMedia,
  Chip, Stack, Grid, Avatar, IconButton, Tab, Tabs, Divider,
  CircularProgress, Container
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
const FOOD_SEEDS = ['food', 'cafe', 'restaurant', 'coffee', 'dessert', 'meal', 'lunch', 'dinner', 'bakery', 'sushi']

const getThumbnail = (post) => {
  if (post.image_url) return post.image_url
  const seed = FOOD_SEEDS[parseInt(post.id?.slice(-4), 16) % FOOD_SEEDS.length] + post.id?.slice(0, 6)
  return `https://picsum.photos/seed/${seed}/600/400`
}

const timeAgo = (iso) => {
  const diff = Date.now() - new Date(iso).getTime()
  const m = Math.floor(diff / 60000)
  if (m < 1) return '방금 전'
  if (m < 60) return `${m}분 전`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h}시간 전`
  return `${Math.floor(h / 24)}일 전`
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
      if (!user) return
      setUser(user)
      supabase.from('profiles').select('username').eq('id', user.id).single()
        .then(({ data }) => setProfile(data))
    })
  }, [])

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

  useEffect(() => { fetchPosts() }, [fetchPosts])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setProfile(null)
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#FAF7F2' }}>

      {/* 상단 헤더 */}
      <Box sx={{ bgcolor: '#fff', borderBottom: '1px solid #eee', position: 'sticky', top: 0, zIndex: 100 }}>
        <Container maxWidth="lg">
          <Stack direction="row" alignItems="center" justifyContent="space-between" py={1.5}>
            <Typography variant="h6" fontWeight={900} color="primary" sx={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
              🍵 ULSAN TastePick
            </Typography>

            {user ? (
              /* 로그인 상태 */
              <Stack direction="row" alignItems="center" spacing={1.5}>
                <Avatar sx={{ width: 30, height: 30, bgcolor: 'primary.main', fontSize: 13, fontWeight: 700 }}>
                  {profile?.username?.[0]?.toUpperCase()}
                </Avatar>
                <Typography variant="body2" fontWeight={600} sx={{ display: { xs: 'none', sm: 'block' } }}>
                  {profile?.username}님
                </Typography>
                <Button variant="contained" size="small" startIcon={<AddIcon />} onClick={() => navigate('/create')} sx={{ borderRadius: 2, fontWeight: 700 }}>
                  글쓰기
                </Button>
                <IconButton size="small" onClick={handleLogout} title="로그아웃">
                  <LogoutIcon fontSize="small" />
                </IconButton>
              </Stack>
            ) : (
              /* 비로그인 상태 */
              <Stack direction="row" spacing={1}>
                <Button variant="outlined" size="small" onClick={() => navigate('/login')} sx={{ borderRadius: 2, fontWeight: 600 }}>
                  로그인
                </Button>
                <Button variant="contained" size="small" onClick={() => navigate('/signup')} sx={{ borderRadius: 2, fontWeight: 600 }}>
                  회원가입
                </Button>
              </Stack>
            )}
          </Stack>
        </Container>
      </Box>

      {/* 히어로 배너 */}
      <Box sx={{ background: 'linear-gradient(135deg, #7C9A6D 0%, #5a7a52 100%)', color: '#fff', py: { xs: 4, md: 6 } }}>
        <Container maxWidth="lg">
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Box>
              {user ? (
                <>
                  <Typography variant="h5" fontWeight={800}>{profile?.username}님, 환영합니다! 👋</Typography>
                  <Typography variant="body2" sx={{ opacity: 0.85, mt: 0.5 }}>오늘 울산에서 어떤 맛집을 발견하셨나요?</Typography>
                </>
              ) : (
                <>
                  <Typography variant="h5" fontWeight={800}>울산 맛집 & 카페를 발견하세요 🍽️</Typography>
                  <Typography variant="body2" sx={{ opacity: 0.85, mt: 0.5 }}>동구 · 중구 · 남구 · 울주군 · 북구의 모든 맛집 정보</Typography>
                </>
              )}
              <Stack direction="row" spacing={1} mt={2} flexWrap="wrap">
                {['동구', '중구', '남구', '울주군', '북구'].map(d => (
                  <Chip key={d} label={`📍 ${d}`} size="small"
                    sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: '#fff', fontWeight: 600, mb: 0.5, cursor: 'pointer' }}
                    onClick={() => setDistrict(d)}
                  />
                ))}
              </Stack>
            </Box>
            {user && (
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => navigate('/create')}
                sx={{ bgcolor: '#E9C46A', color: '#333', fontWeight: 700, '&:hover': { bgcolor: '#d4ad45' }, display: { xs: 'none', sm: 'flex' }, borderRadius: 3 }}
              >
                게시물 추가
              </Button>
            )}
            {!user && (
              <Button
                variant="contained"
                onClick={() => navigate('/signup')}
                sx={{ bgcolor: '#E9C46A', color: '#333', fontWeight: 700, '&:hover': { bgcolor: '#d4ad45' }, display: { xs: 'none', sm: 'flex' }, borderRadius: 3 }}
              >
                지금 참여하기 →
              </Button>
            )}
          </Stack>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 3 }}>

        {/* 필터 바 */}
        <Box sx={{ bgcolor: '#fff', borderRadius: 3, p: 2, mb: 2, boxShadow: '0 1px 6px rgba(0,0,0,0.06)' }}>
          <Stack direction="row" spacing={1} flexWrap="wrap">
            {DISTRICTS.map(d => (
              <Chip
                key={d}
                label={d === '전체' ? '📍 전체' : `📍 ${d}`}
                onClick={() => setDistrict(d)}
                sx={{
                  mb: 0.5, fontWeight: 600, cursor: 'pointer',
                  bgcolor: district === d ? 'primary.main' : '#f5f5f5',
                  color: district === d ? '#fff' : '#555',
                  '&:hover': { bgcolor: district === d ? 'primary.dark' : '#ebebeb' },
                }}
              />
            ))}
          </Stack>
        </Box>

        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
          <Tabs value={sortBy} onChange={(_, v) => setSortBy(v)} textColor="primary" indicatorColor="primary"
            sx={{ minHeight: 0, '& .MuiTab-root': { minHeight: 40, py: 0, fontWeight: 700, fontSize: '0.875rem' } }}
          >
            <Tab icon={<AccessTimeIcon sx={{ fontSize: 15 }} />} iconPosition="start" label="최신순" value="recent" />
            <Tab icon={<WhatshotIcon sx={{ fontSize: 15 }} />} iconPosition="start" label="인기순" value="popular" />
          </Tabs>
          <Typography variant="caption" color="text.secondary">총 {posts.length}개의 게시물</Typography>
        </Stack>

        <Divider sx={{ mb: 3 }} />

        {/* 게시물 그리드 */}
        {loading ? (
          <Box display="flex" justifyContent="center" py={10}><CircularProgress color="primary" /></Box>
        ) : posts.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 10, bgcolor: '#fff', borderRadius: 3 }}>
            <RestaurantIcon sx={{ fontSize: 64, color: '#ddd', mb: 2 }} />
            <Typography variant="h6" color="text.secondary" fontWeight={600}>아직 게시물이 없어요</Typography>
            <Typography variant="body2" color="text.secondary" mb={3}>울산 첫 번째 맛집을 공유해보세요!</Typography>
            {user
              ? <Button variant="contained" startIcon={<AddIcon />} onClick={() => navigate('/create')}>첫 게시물 작성</Button>
              : <Button variant="contained" onClick={() => navigate('/signup')}>가입하고 공유하기</Button>
            }
          </Box>
        ) : (
          <Grid container spacing={2.5}>
            {posts.map(post => (
              <Grid item xs={12} sm={6} md={4} key={post.id}>
                <Card
                  sx={{
                    height: '100%', cursor: 'pointer',
                    transition: 'transform 0.15s, box-shadow 0.15s',
                    '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 12px 28px rgba(124,154,109,0.18)' }
                  }}
                  onClick={() => navigate(`/post/${post.id}`)}
                >
                  {/* 썸네일 - 항상 표시 */}
                  <CardMedia
                    component="img"
                    height={200}
                    image={getThumbnail(post)}
                    alt={post.title}
                    sx={{ objectFit: 'cover' }}
                  />

                  <CardContent sx={{ pb: '12px !important' }}>
                    <Stack direction="row" spacing={0.5} mb={1} flexWrap="wrap">
                      {post.district && (
                        <Chip label={post.district} size="small" color="primary" sx={{ fontWeight: 700, fontSize: '0.7rem', height: 20 }} />
                      )}
                      {post.hashtags?.slice(0, 2).map(tag => (
                        <Chip key={tag} label={`#${tag}`} size="small"
                          sx={{ bgcolor: '#FFF8E7', color: '#A67C52', fontSize: '0.7rem', height: 20 }} />
                      ))}
                    </Stack>

                    <Typography variant="subtitle1" fontWeight={700} noWrap mb={0.5}>{post.title}</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{
                      display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
                      overflow: 'hidden', lineHeight: 1.5, mb: 1.5
                    }}>
                      {post.content}
                    </Typography>

                    <Divider sx={{ mb: 1.2 }} />

                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                      <Stack direction="row" alignItems="center" spacing={0.7}>
                        <Avatar sx={{ width: 20, height: 20, bgcolor: 'secondary.main', fontSize: 10, fontWeight: 700 }}>
                          {post.profiles?.username?.[0]?.toUpperCase()}
                        </Avatar>
                        <Typography variant="caption" fontWeight={600}>{post.profiles?.username}</Typography>
                        <Typography variant="caption" color="text.secondary">· {timeAgo(post.created_at)}</Typography>
                      </Stack>
                      <Stack direction="row" spacing={1.2}>
                        <Stack direction="row" alignItems="center" spacing={0.2}>
                          <FavoriteIcon sx={{ fontSize: 12, color: '#e57373' }} />
                          <Typography variant="caption" color="text.secondary">{post.likeCount}</Typography>
                        </Stack>
                        <Stack direction="row" alignItems="center" spacing={0.2}>
                          <ChatBubbleOutlinedIcon sx={{ fontSize: 12, color: 'text.secondary' }} />
                          <Typography variant="caption" color="text.secondary">{post.commentCount}</Typography>
                        </Stack>
                        <Stack direction="row" alignItems="center" spacing={0.2}>
                          <VisibilityIcon sx={{ fontSize: 12, color: 'text.secondary' }} />
                          <Typography variant="caption" color="text.secondary">{post.views}</Typography>
                        </Stack>
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>

      {/* 하단 푸터 */}
      <Box sx={{ bgcolor: '#333', color: '#999', py: 3, mt: 6, textAlign: 'center' }}>
        <Typography variant="body2">© 2025 ULSAN TastePick · 울산 맛집 & 카페 커뮤니티</Typography>
      </Box>
    </Box>
  )
}

export default BoardPage
