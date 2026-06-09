import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box, Typography, Button, Card, CardMedia, CardContent, CardActionArea,
  Chip, Grid, Avatar, IconButton, Divider, Stack, Tabs, Tab
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import LogoutIcon from '@mui/icons-material/Logout'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutlined'
import VisibilityIcon from '@mui/icons-material/Visibility'
import LocalCafeIcon from '@mui/icons-material/LocalCafe'
import { supabase } from '../supabase'
import { formatDistanceToNow } from '../utils/formatDate'

const DISTRICTS = ['전체', '동구', '중구', '남구', '울주군', '북구']

const BoardPage = ({ session }) => {
  const navigate = useNavigate()
  const [posts, setPosts] = useState([])
  const [district, setDistrict] = useState('전체')
  const [sortBy, setSortBy] = useState('latest') // latest | popular
  const [username, setUsername] = useState('')

  useEffect(() => {
    supabase.from('profiles').select('username').eq('id', session.user.id).single()
      .then(({ data }) => { if (data) setUsername(data.username) })
  }, [session])

  const fetchPosts = useCallback(async () => {
    let query = supabase
      .from('posts')
      .select(`
        id, title, content, image_url, district, views, created_at, hashtags,
        user_id,
        profiles!posts_user_id_fkey(username),
        comments(count),
        likes(count)
      `)

    if (district !== '전체') query = query.eq('district', district)

    if (sortBy === 'popular') {
      query = query.order('views', { ascending: false })
    } else {
      query = query.order('created_at', { ascending: false })
    }

    const { data } = await query
    setPosts(data || [])
  }, [district, sortBy])

  useEffect(() => { fetchPosts() }, [fetchPosts])

  const handleLogout = async () => {
    await supabase.auth.signOut()
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* 헤더 */}
      <Box sx={{ bgcolor: 'white', borderBottom: '1px solid #E8E0D5', position: 'sticky', top: 0, zIndex: 100 }}>
        <Box sx={{ maxWidth: 1100, mx: 'auto', px: 3, py: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{
              width: 36, height: 36, borderRadius: '50%',
              background: 'linear-gradient(135deg, #7C9A6D 0%, #A67C52 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <LocalCafeIcon sx={{ color: 'white', fontSize: 20 }} />
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 700, color: '#7C9A6D' }}>ULSAN TastePick</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Button
              variant="contained" startIcon={<AddIcon />}
              onClick={() => navigate('/write')}
              sx={{ bgcolor: '#7C9A6D', '&:hover': { bgcolor: '#6A8A5C' } }}
            >
              게시물 추가
            </Button>
            <IconButton onClick={handleLogout} title="로그아웃">
              <LogoutIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>

      <Box sx={{ maxWidth: 1100, mx: 'auto', px: 3, py: 4 }}>
        {/* 환영 메시지 */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            {username ? `${username}님, 환영합니다! 👋` : '환영합니다!'}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
            울산의 맛집과 카페 정보를 공유해보세요.
          </Typography>
        </Box>

        {/* 구역 필터 */}
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
          {DISTRICTS.map(d => (
            <Chip
              key={d} label={d}
              onClick={() => setDistrict(d)}
              variant={district === d ? 'filled' : 'outlined'}
              sx={district === d
                ? { bgcolor: '#7C9A6D', color: 'white', fontWeight: 600, '&:hover': { bgcolor: '#6A8A5C' } }
                : { borderColor: '#C5B49A', color: '#666', '&:hover': { borderColor: '#7C9A6D' } }
              }
            />
          ))}
        </Box>

        {/* 정렬 탭 */}
        <Tabs
          value={sortBy} onChange={(_, v) => setSortBy(v)}
          sx={{ mb: 3, '& .MuiTabs-indicator': { bgcolor: '#7C9A6D' } }}
        >
          <Tab label="최신순" value="latest" sx={{ fontWeight: 600, '&.Mui-selected': { color: '#7C9A6D' } }} />
          <Tab label="인기순" value="popular" sx={{ fontWeight: 600, '&.Mui-selected': { color: '#7C9A6D' } }} />
        </Tabs>

        {/* 게시물 카드 그리드 */}
        {posts.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 8, color: 'text.secondary' }}>
            <Typography variant="h6">아직 게시물이 없습니다.</Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>첫 번째 게시물을 작성해보세요!</Typography>
          </Box>
        ) : (
          <Grid container spacing={2.5}>
            {posts.map(post => (
              <Grid item xs={12} sm={6} md={4} key={post.id}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardActionArea onClick={() => navigate(`/post/${post.id}`)} sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
                    {post.image_url && (
                      <CardMedia component="img" height={180} image={post.image_url} alt={post.title} sx={{ objectFit: 'cover' }} />
                    )}
                    {!post.image_url && (
                      <Box sx={{ height: 120, bgcolor: '#F0EBE3', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <LocalCafeIcon sx={{ fontSize: 48, color: '#C5B49A' }} />
                      </Box>
                    )}
                    <CardContent sx={{ flexGrow: 1, pb: 1 }}>
                      {post.district && (
                        <Chip label={post.district} size="small" sx={{ mb: 1, bgcolor: '#EFF4EC', color: '#7C9A6D', fontSize: '0.7rem' }} />
                      )}
                      <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 0.5, lineHeight: 1.4,
                        overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                        {post.title}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1,
                        overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                        {post.content}
                      </Typography>
                      {post.hashtags && post.hashtags.length > 0 && (
                        <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mb: 1 }}>
                          {post.hashtags.slice(0, 3).map((tag, i) => (
                            <Typography key={i} variant="caption" sx={{ color: '#A67C52' }}>#{tag}</Typography>
                          ))}
                        </Box>
                      )}
                    </CardContent>
                  </CardActionArea>
                  <Divider />
                  <Box sx={{ px: 2, py: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <Avatar sx={{ width: 22, height: 22, bgcolor: '#7C9A6D', fontSize: 11 }}>
                        {post.profiles?.username?.[0]?.toUpperCase()}
                      </Avatar>
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        {post.profiles?.username}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#BBBBBB', mx: 0.5 }}>·</Typography>
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        {formatDistanceToNow(post.created_at)}
                      </Typography>
                    </Box>
                    <Stack direction="row" spacing={1.5}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.3 }}>
                        <FavoriteIcon sx={{ fontSize: 13, color: '#E9C46A' }} />
                        <Typography variant="caption">{post.likes?.[0]?.count ?? 0}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.3 }}>
                        <ChatBubbleOutlineIcon sx={{ fontSize: 13, color: '#BBBBBB' }} />
                        <Typography variant="caption">{post.comments?.[0]?.count ?? 0}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.3 }}>
                        <VisibilityIcon sx={{ fontSize: 13, color: '#BBBBBB' }} />
                        <Typography variant="caption">{post.views}</Typography>
                      </Box>
                    </Stack>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Box>
  )
}

export default BoardPage
