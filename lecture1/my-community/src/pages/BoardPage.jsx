import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box, Typography, Button, Card, CardContent, CardMedia, CardActionArea,
  Chip, Stack, Grid, Avatar, IconButton, Tabs, Tab, Divider, CircularProgress
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import LogoutIcon from '@mui/icons-material/Logout'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutlined'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { supabase } from '../utils/supabase'

const DISTRICTS = ['전체', '동구', '중구', '남구', '울주군', '북구']

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
      supabase.from('profiles').select('username').eq('id', user.id).single().then(({ data }) => setProfile(data))
    })
  }, [navigate])

  const fetchPosts = useCallback(async () => {
    setLoading(true)
    let query = supabase
      .from('posts')
      .select('id, title, content, image_url, district, hashtags, views, created_at, user_id, profiles(username)')

    if (district !== '전체') query = query.eq('district', district)
    if (sortBy === 'recent') query = query.order('created_at', { ascending: false })
    else query = query.order('views', { ascending: false })

    const { data } = await query.limit(20)

    if (data) {
      const postIds = data.map((p) => p.id)
      const { data: likesData } = await supabase.from('likes').select('post_id').in('post_id', postIds)
      const { data: commentsData } = await supabase.from('comments').select('post_id').in('post_id', postIds)

      const likesMap = {}
      const commentsMap = {}
      likesData?.forEach((l) => { likesMap[l.post_id] = (likesMap[l.post_id] || 0) + 1 })
      commentsData?.forEach((c) => { commentsMap[c.post_id] = (commentsMap[c.post_id] || 0) + 1 })

      setPosts(data.map((p) => ({ ...p, likeCount: likesMap[p.id] || 0, commentCount: commentsMap[p.id] || 0 })))
    }
    setLoading(false)
  }, [district, sortBy])

  useEffect(() => { if (user) fetchPosts() }, [user, fetchPosts])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/login')
  }

  const formatDate = (iso) => {
    const d = new Date(iso)
    return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Box sx={{ bgcolor: 'primary.main', color: '#fff', py: 2, px: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h6" fontWeight={800}>🍵 ULSAN TastePick</Typography>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography variant="body2">{profile?.username}님, 환영합니다!</Typography>
          <IconButton size="small" onClick={handleLogout} sx={{ color: '#fff' }}>
            <LogoutIcon fontSize="small" />
          </IconButton>
        </Stack>
      </Box>

      <Box sx={{ maxWidth: 960, mx: 'auto', p: 3 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
          <Tabs value={sortBy} onChange={(_, v) => setSortBy(v)} textColor="primary" indicatorColor="primary">
            <Tab label="최신순" value="recent" />
            <Tab label="인기순" value="popular" />
          </Tabs>
          <Button variant="contained" startIcon={<AddIcon />} onClick={() => navigate('/create')}>
            게시물 작성
          </Button>
        </Stack>

        <Stack direction="row" spacing={1} mb={3} flexWrap="wrap">
          {DISTRICTS.map((d) => (
            <Chip
              key={d}
              label={d}
              onClick={() => setDistrict(d)}
              color={district === d ? 'primary' : 'default'}
              variant={district === d ? 'filled' : 'outlined'}
              sx={{ mb: 1 }}
            />
          ))}
        </Stack>

        <Divider sx={{ mb: 3 }} />

        {loading ? (
          <Box display="flex" justifyContent="center" py={8}><CircularProgress color="primary" /></Box>
        ) : posts.length === 0 ? (
          <Box textAlign="center" py={8}>
            <Typography color="text.secondary">아직 게시물이 없습니다. 첫 번째 맛집을 공유해보세요!</Typography>
          </Box>
        ) : (
          <Grid container spacing={2}>
            {posts.map((post) => (
              <Grid item xs={12} sm={6} md={4} key={post.id}>
                <Card sx={{ height: '100%' }}>
                  <CardActionArea onClick={() => navigate(`/post/${post.id}`)} sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
                    {post.image_url && (
                      <CardMedia component="img" height={180} image={post.image_url} alt={post.title} sx={{ objectFit: 'cover' }} />
                    )}
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Stack direction="row" spacing={0.5} mb={1} flexWrap="wrap">
                        {post.district && <Chip label={post.district} size="small" color="primary" variant="outlined" />}
                        {post.hashtags?.slice(0, 2).map((tag) => (
                          <Chip key={tag} label={`#${tag}`} size="small" sx={{ bgcolor: '#E9C46A22', color: '#A67C52' }} />
                        ))}
                      </Stack>
                      <Typography variant="subtitle1" fontWeight={700} noWrap>{post.title}</Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', mt: 0.5 }}>
                        {post.content}
                      </Typography>
                      <Stack direction="row" spacing={1.5} mt={1.5} alignItems="center">
                        <Avatar sx={{ width: 22, height: 22, bgcolor: 'primary.main', fontSize: 11 }}>
                          {post.profiles?.username?.[0]?.toUpperCase()}
                        </Avatar>
                        <Typography variant="caption" color="text.secondary">{post.profiles?.username}</Typography>
                        <Typography variant="caption" color="text.secondary">{formatDate(post.created_at)}</Typography>
                      </Stack>
                      <Stack direction="row" spacing={2} mt={1}>
                        <Stack direction="row" alignItems="center" spacing={0.3}>
                          <FavoriteIcon sx={{ fontSize: 14, color: '#e57373' }} />
                          <Typography variant="caption">{post.likeCount}</Typography>
                        </Stack>
                        <Stack direction="row" alignItems="center" spacing={0.3}>
                          <ChatBubbleOutlineIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                          <Typography variant="caption">{post.commentCount}</Typography>
                        </Stack>
                        <Stack direction="row" alignItems="center" spacing={0.3}>
                          <VisibilityIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                          <Typography variant="caption">{post.views}</Typography>
                        </Stack>
                      </Stack>
                    </CardContent>
                  </CardActionArea>
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
