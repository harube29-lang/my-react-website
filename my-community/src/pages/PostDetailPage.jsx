import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Box, Typography, Button, IconButton, Avatar, Chip, Divider,
  TextField, Paper, Stack, Alert, CircularProgress
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import PersonRemoveIcon from '@mui/icons-material/PersonRemove'
import ShareIcon from '@mui/icons-material/Share'
import DeleteOutlineIcon from '@mui/icons-material/Delete'
import SendIcon from '@mui/icons-material/Send'
import { supabase } from '../supabase'
import { formatDistanceToNow } from '../utils/formatDate'

const PostDetailPage = ({ session }) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [post, setPost] = useState(null)
  const [comments, setComments] = useState([])
  const [commentText, setCommentText] = useState('')
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(0)
  const [followed, setFollowed] = useState(false)
  const [myUsername, setMyUsername] = useState('')
  const [loading, setLoading] = useState(true)
  const [commentLoading, setCommentLoading] = useState(false)
  const [shareMsg, setShareMsg] = useState('')

  useEffect(() => {
    supabase.from('profiles').select('username').eq('id', session.user.id).single()
      .then(({ data }) => { if (data) setMyUsername(data.username) })
  }, [session])

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true)

      // 조회수 증가
      await supabase.rpc('increment_views', { post_id: id })

      // 게시물
      const { data: postData } = await supabase
        .from('posts')
        .select('*, profiles!posts_user_id_fkey(username)')
        .eq('id', id)
        .single()
      setPost(postData)

      // 댓글
      const { data: commentData } = await supabase
        .from('comments')
        .select('*, profiles!comments_user_id_fkey(username)')
        .eq('post_id', id)
        .order('created_at', { ascending: true })
      setComments(commentData || [])

      // 좋아요
      const { data: likeData } = await supabase
        .from('likes').select('id').eq('post_id', id).eq('user_id', session.user.id).single()
      setLiked(!!likeData)
      const { count } = await supabase.from('likes').select('*', { count: 'exact', head: true }).eq('post_id', id)
      setLikeCount(count || 0)

      // 팔로우
      if (postData && postData.user_id !== session.user.id) {
        const { data: followData } = await supabase
          .from('follows').select('id')
          .eq('follower_id', session.user.id).eq('following_id', postData.user_id).single()
        setFollowed(!!followData)
      }

      setLoading(false)
    }
    fetchAll()
  }, [id, session])

  const toggleLike = async () => {
    if (liked) {
      await supabase.from('likes').delete().eq('post_id', id).eq('user_id', session.user.id)
      setLiked(false)
      setLikeCount(prev => prev - 1)
    } else {
      await supabase.from('likes').insert({ post_id: id, user_id: session.user.id })
      setLiked(true)
      setLikeCount(prev => prev + 1)
    }
  }

  const toggleFollow = async () => {
    if (followed) {
      await supabase.from('follows').delete()
        .eq('follower_id', session.user.id).eq('following_id', post.user_id)
      setFollowed(false)
    } else {
      await supabase.from('follows').insert({ follower_id: session.user.id, following_id: post.user_id })
      setFollowed(true)
    }
  }

  const handleComment = async () => {
    if (!commentText.trim()) return
    setCommentLoading(true)
    const { data } = await supabase.from('comments').insert({
      post_id: id, user_id: session.user.id, content: commentText.trim()
    }).select('*, profiles!comments_user_id_fkey(username)').single()
    if (data) {
      setComments(prev => [...prev, data])
      setCommentText('')
    }
    setCommentLoading(false)
  }

  const handleDeleteComment = async (commentId) => {
    await supabase.from('comments').delete().eq('id', commentId)
    setComments(prev => prev.filter(c => c.id !== commentId))
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    setShareMsg('링크가 복사되었습니다!')
    setTimeout(() => setShareMsg(''), 2000)
  }

  if (loading) return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <CircularProgress sx={{ color: '#7C9A6D' }} />
    </Box>
  )

  if (!post) return (
    <Box sx={{ textAlign: 'center', py: 8 }}>
      <Typography>게시물을 찾을 수 없습니다.</Typography>
      <Button onClick={() => navigate('/')} sx={{ mt: 2 }}>목록으로</Button>
    </Box>
  )

  const isMyPost = post.user_id === session.user.id

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* 헤더 */}
      <Box sx={{ bgcolor: 'white', borderBottom: '1px solid #E8E0D5', position: 'sticky', top: 0, zIndex: 100 }}>
        <Box sx={{ maxWidth: 750, mx: 'auto', px: 3, py: 1.5, display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton onClick={() => navigate(-1)}><ArrowBackIcon /></IconButton>
          <Typography variant="h6" sx={{ fontWeight: 700, flexGrow: 1 }} noWrap>{post.title}</Typography>
        </Box>
      </Box>

      <Box sx={{ maxWidth: 750, mx: 'auto', px: 3, py: 4 }}>
        <Paper elevation={0} sx={{ p: 3, border: '1px solid #E8E0D5', borderRadius: 3, mb: 3 }}>
          {/* 구역 태그 */}
          {post.district && (
            <Chip label={post.district} size="small" sx={{ mb: 2, bgcolor: '#EFF4EC', color: '#7C9A6D' }} />
          )}

          {/* 제목 */}
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>{post.title}</Typography>

          {/* 작성자 정보 */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Avatar sx={{ bgcolor: '#7C9A6D', width: 40, height: 40 }}>
                {post.profiles?.username?.[0]?.toUpperCase()}
              </Avatar>
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>{post.profiles?.username}</Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  {formatDistanceToNow(post.created_at)}
                </Typography>
              </Box>
            </Box>
            {!isMyPost && (
              <Button
                variant={followed ? 'outlined' : 'contained'}
                size="small"
                startIcon={followed ? <PersonRemoveIcon /> : <PersonAddIcon />}
                onClick={toggleFollow}
                sx={followed
                  ? { borderColor: '#BBBBBB', color: '#888' }
                  : { bgcolor: '#7C9A6D', '&:hover': { bgcolor: '#6A8A5C' } }
                }
              >
                {followed ? '팔로우 취소' : '팔로우'}
              </Button>
            )}
          </Box>

          <Divider sx={{ mb: 2 }} />

          {/* 이미지 */}
          {post.image_url && (
            <Box sx={{ mb: 2, borderRadius: 2, overflow: 'hidden' }}>
              <img src={post.image_url} alt="게시물 이미지" style={{ width: '100%', maxHeight: 400, objectFit: 'cover' }} />
            </Box>
          )}

          {/* 내용 */}
          <Typography variant="body1" sx={{ lineHeight: 1.8, whiteSpace: 'pre-wrap', mb: 2 }}>
            {post.content}
          </Typography>

          {/* 해시태그 */}
          {post.hashtags && post.hashtags.length > 0 && (
            <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 2, gap: 1 }}>
              {post.hashtags.map(tag => (
                <Typography key={tag} variant="body2" sx={{ color: '#A67C52' }}>#{tag}</Typography>
              ))}
            </Stack>
          )}

          <Divider sx={{ mb: 2 }} />

          {/* 액션 버튼 */}
          {shareMsg && <Alert severity="success" sx={{ mb: 1, borderRadius: 2 }}>{shareMsg}</Alert>}
          <Stack direction="row" spacing={2} alignItems="center">
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <IconButton onClick={toggleLike} sx={{ color: liked ? '#E9C46A' : '#BBBBBB' }}>
                {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              </IconButton>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>{likeCount}</Typography>
            </Box>
            <IconButton onClick={handleShare} sx={{ color: '#BBBBBB' }}>
              <ShareIcon />
            </IconButton>
          </Stack>
        </Paper>

        {/* 댓글 섹션 */}
        <Paper elevation={0} sx={{ p: 3, border: '1px solid #E8E0D5', borderRadius: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
            댓글 {comments.length}개
          </Typography>

          {/* 댓글 입력 */}
          <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
            <Avatar sx={{ bgcolor: '#7C9A6D', width: 36, height: 36, fontSize: 14 }}>
              {myUsername?.[0]?.toUpperCase()}
            </Avatar>
            <TextField
              fullWidth multiline maxRows={3} value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="댓글을 입력하세요..."
              onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleComment() } }}
              size="small"
            />
            <IconButton onClick={handleComment} disabled={!commentText.trim() || commentLoading}
              sx={{ color: '#7C9A6D', alignSelf: 'flex-end' }}>
              <SendIcon />
            </IconButton>
          </Box>

          {/* 댓글 목록 */}
          {comments.length === 0 ? (
            <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center', py: 3 }}>
              첫 번째 댓글을 남겨보세요!
            </Typography>
          ) : (
            <Stack spacing={2}>
              {comments.map(comment => (
                <Box key={comment.id} sx={{ display: 'flex', gap: 1.5 }}>
                  <Avatar sx={{ bgcolor: '#A67C52', width: 32, height: 32, fontSize: 13 }}>
                    {comment.profiles?.username?.[0]?.toUpperCase()}
                  </Avatar>
                  <Box sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.3 }}>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {comment.profiles?.username}
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        {formatDistanceToNow(comment.created_at)}
                      </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ lineHeight: 1.6 }}>{comment.content}</Typography>
                  </Box>
                  {comment.user_id === session.user.id && (
                    <IconButton size="small" onClick={() => handleDeleteComment(comment.id)}
                      sx={{ color: '#BBBBBB', alignSelf: 'flex-start' }}>
                      <DeleteOutlineIcon fontSize="small" />
                    </IconButton>
                  )}
                </Box>
              ))}
            </Stack>
          )}
        </Paper>
      </Box>
    </Box>
  )
}

export default PostDetailPage
