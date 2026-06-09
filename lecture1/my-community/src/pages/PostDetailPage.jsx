import { useState, useEffect, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Box, Typography, Button, IconButton, Card, CardContent, Chip,
  Stack, Avatar, TextField, Divider, CircularProgress, Alert
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import PersonRemoveIcon from '@mui/icons-material/PersonRemove'
import DeleteIcon from '@mui/icons-material/Delete'
import ShareIcon from '@mui/icons-material/Share'
import { supabase } from '../utils/supabase'

const PostDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [post, setPost] = useState(null)
  const [comments, setComments] = useState([])
  const [commentText, setCommentText] = useState('')
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(0)
  const [followed, setFollowed] = useState(false)
  const [loading, setLoading] = useState(true)
  const [submittingComment, setSubmittingComment] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) navigate('/login')
      else setUser(user)
    })
  }, [navigate])

  const fetchPost = useCallback(async () => {
    const { data } = await supabase
      .from('posts')
      .select('*, profiles(username)')
      .eq('id', id)
      .single()
    if (data) {
      setPost(data)
      await supabase.from('posts').update({ views: (data.views || 0) + 1 }).eq('id', id)
    }
  }, [id])

  const fetchComments = useCallback(async () => {
    const { data } = await supabase
      .from('comments')
      .select('*, profiles(username)')
      .eq('post_id', id)
      .order('created_at', { ascending: true })
    setComments(data || [])
  }, [id])

  const fetchLikes = useCallback(async (uid) => {
    const { data } = await supabase.from('likes').select('id, user_id').eq('post_id', id)
    setLikeCount(data?.length || 0)
    setLiked(data?.some((l) => l.user_id === uid) || false)
  }, [id])

  const fetchFollows = useCallback(async (uid, authorId) => {
    if (!authorId || uid === authorId) return
    const { data } = await supabase.from('follows').select('id').eq('follower_id', uid).eq('following_id', authorId).single()
    setFollowed(!!data)
  }, [])

  useEffect(() => {
    if (!user) return
    const load = async () => {
      setLoading(true)
      await fetchPost()
      await fetchComments()
      await fetchLikes(user.id)
      setLoading(false)
    }
    load()
  }, [user, fetchPost, fetchComments, fetchLikes])

  useEffect(() => {
    if (user && post) fetchFollows(user.id, post.user_id)
  }, [user, post, fetchFollows])

  const handleLike = async () => {
    if (!user) return
    if (liked) {
      await supabase.from('likes').delete().eq('post_id', id).eq('user_id', user.id)
      setLiked(false)
      setLikeCount((c) => c - 1)
    } else {
      await supabase.from('likes').insert({ post_id: id, user_id: user.id })
      setLiked(true)
      setLikeCount((c) => c + 1)
    }
  }

  const handleFollow = async () => {
    if (!user || !post || user.id === post.user_id) return
    if (followed) {
      await supabase.from('follows').delete().eq('follower_id', user.id).eq('following_id', post.user_id)
      setFollowed(false)
    } else {
      await supabase.from('follows').insert({ follower_id: user.id, following_id: post.user_id })
      setFollowed(true)
    }
  }

  const handleCommentSubmit = async () => {
    if (!commentText.trim()) return
    setSubmittingComment(true)
    const { error: err } = await supabase.from('comments').insert({
      post_id: id, user_id: user.id, content: commentText.trim()
    })
    if (!err) { setCommentText(''); await fetchComments() }
    else setError('댓글 등록에 실패했습니다.')
    setSubmittingComment(false)
  }

  const handleCommentDelete = async (commentId) => {
    await supabase.from('comments').delete().eq('id', commentId).eq('user_id', user.id)
    await fetchComments()
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: post?.title, url: window.location.href })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert('링크가 복사되었습니다!')
    }
  }

  const formatDateTime = (iso) => {
    const d = new Date(iso)
    return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
  }

  if (loading) return <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh"><CircularProgress /></Box>
  if (!post) return <Box p={4}><Typography>게시물을 찾을 수 없습니다.</Typography></Box>

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Box sx={{ bgcolor: 'primary.main', color: '#fff', py: 2, px: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
        <IconButton size="small" onClick={() => navigate('/board')} sx={{ color: '#fff' }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h6" fontWeight={700} noWrap>{post.title}</Typography>
      </Box>

      <Box sx={{ maxWidth: 720, mx: 'auto', p: 3 }}>
        <Card sx={{ mb: 3 }}>
          {post.image_url && (
            <Box component="img" src={post.image_url} alt={post.title} sx={{ width: '100%', maxHeight: 340, objectFit: 'cover', borderRadius: '16px 16px 0 0' }} />
          )}
          <CardContent>
            <Stack direction="row" spacing={0.5} mb={1.5} flexWrap="wrap">
              {post.district && <Chip label={post.district} size="small" color="primary" />}
              {post.hashtags?.map((tag) => <Chip key={tag} label={`#${tag}`} size="small" sx={{ bgcolor: '#E9C46A22', color: '#A67C52' }} />)}
            </Stack>

            <Typography variant="h5" fontWeight={700} mb={1}>{post.title}</Typography>

            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
                  {post.profiles?.username?.[0]?.toUpperCase()}
                </Avatar>
                <Box>
                  <Typography variant="body2" fontWeight={600}>{post.profiles?.username}</Typography>
                  <Typography variant="caption" color="text.secondary">{formatDateTime(post.created_at)}</Typography>
                </Box>
                {user && post.user_id !== user.id && (
                  <Button
                    size="small"
                    variant={followed ? 'outlined' : 'contained'}
                    startIcon={followed ? <PersonRemoveIcon /> : <PersonAddIcon />}
                    onClick={handleFollow}
                    color="secondary"
                  >
                    {followed ? '언팔로우' : '팔로우'}
                  </Button>
                )}
              </Stack>
              <IconButton onClick={handleShare}><ShareIcon /></IconButton>
            </Stack>

            <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', lineHeight: 1.8 }} mb={2}>{post.content}</Typography>

            <Stack direction="row" alignItems="center" spacing={1}>
              <IconButton onClick={handleLike} color={liked ? 'error' : 'default'}>
                {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              </IconButton>
              <Typography variant="body2">{likeCount}명이 좋아합니다</Typography>
            </Stack>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Typography variant="h6" fontWeight={700} mb={2}>댓글 {comments.length}개</Typography>

            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

            {user && (
              <Stack direction="row" spacing={1} mb={3}>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="댓글을 입력하세요..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleCommentSubmit() } }}
                  multiline
                  maxRows={3}
                />
                <Button variant="contained" onClick={handleCommentSubmit} disabled={submittingComment || !commentText.trim()} sx={{ minWidth: 70 }}>
                  {submittingComment ? <CircularProgress size={18} /> : '등록'}
                </Button>
              </Stack>
            )}

            <Stack spacing={2}>
              {comments.length === 0 ? (
                <Typography color="text.secondary" textAlign="center" py={2}>첫 번째 댓글을 남겨보세요!</Typography>
              ) : (
                comments.map((comment) => (
                  <Box key={comment.id}>
                    <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                      <Stack direction="row" spacing={1} alignItems="flex-start">
                        <Avatar sx={{ width: 28, height: 28, bgcolor: 'secondary.main', fontSize: 12 }}>
                          {comment.profiles?.username?.[0]?.toUpperCase()}
                        </Avatar>
                        <Box>
                          <Stack direction="row" spacing={1} alignItems="center">
                            <Typography variant="body2" fontWeight={600}>{comment.profiles?.username}</Typography>
                            <Typography variant="caption" color="text.secondary">{formatDateTime(comment.created_at)}</Typography>
                          </Stack>
                          <Typography variant="body2" sx={{ mt: 0.3 }}>{comment.content}</Typography>
                        </Box>
                      </Stack>
                      {user?.id === comment.user_id && (
                        <IconButton size="small" onClick={() => handleCommentDelete(comment.id)}>
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      )}
                    </Stack>
                    <Divider sx={{ mt: 1.5 }} />
                  </Box>
                ))
              )}
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </Box>
  )
}

export default PostDetailPage
