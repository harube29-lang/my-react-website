import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  Box, Typography, TextField, Button, Card, CardContent,
  Chip, Stack, MenuItem, Select, FormControl, InputLabel,
  IconButton, CircularProgress, Alert
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ShuffleIcon from '@mui/icons-material/Shuffle'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'
import { supabase } from '../utils/supabase'

const DISTRICTS = ['동구', '중구', '남구', '울주군', '북구']

const EditPostPage = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [district, setDistrict] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [hashtagInput, setHashtagInput] = useState('')
  const [hashtags, setHashtags] = useState([])
  const [submitting, setSubmitting] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const init = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) { navigate('/login', { state: { from: `/edit/${id}` } }); return }
      setUser(session.user)

      const { data: post } = await supabase.from('posts').select('*').eq('id', id).single()
      if (!post || post.user_id !== session.user.id) { navigate('/'); return }

      setTitle(post.title)
      setContent(post.content)
      setDistrict(post.district || '')
      setImageUrl(post.image_url || '')
      setHashtags(post.hashtags || [])
      setLoading(false)
    }
    init()
  }, [id, navigate])

  const handleRandomImage = () => {
    const lock = Math.floor(Math.random() * 200) + 1
    setImageUrl(`https://loremflickr.com/800/500/food,restaurant?lock=${lock}`)
  }

  const handleAddHashtag = () => {
    const tag = hashtagInput.trim().replace(/^#/, '')
    if (tag && !hashtags.includes(tag) && hashtags.length < 5) {
      setHashtags([...hashtags, tag])
      setHashtagInput('')
    }
  }

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) { setError('제목과 내용을 입력해주세요.'); return }
    setSubmitting(true)
    setError('')
    const { error: err } = await supabase.from('posts').update({
      title: title.trim(),
      content: content.trim(),
      district: district || null,
      image_url: imageUrl || null,
      hashtags: hashtags.length > 0 ? hashtags : null,
    }).eq('id', id).eq('user_id', user.id)
    setSubmitting(false)
    if (err) { setError(`수정 실패: ${err.message}`); return }
    navigate(`/post/${id}`)
  }

  if (loading) return <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh"><CircularProgress /></Box>

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#FAF7F2' }}>
      <Box sx={{ bgcolor: 'primary.main', color: '#fff', py: 2, px: 3, display: 'flex', alignItems: 'center', gap: 1, position: 'sticky', top: 0, zIndex: 100 }}>
        <IconButton size="small" onClick={() => navigate(`/post/${id}`)} sx={{ color: '#fff' }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h6" fontWeight={700}>게시물 수정</Typography>
      </Box>

      <Box sx={{ maxWidth: 720, mx: 'auto', p: { xs: 2, sm: 3, md: 4 } }}>
        <Card sx={{ borderRadius: 4, boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}>
          <CardContent sx={{ p: { xs: 2.5, sm: 3.5 } }}>
            <Stack spacing={3}>
              {error && <Alert severity="error" sx={{ borderRadius: 2 }}>{error}</Alert>}

              <TextField label="제목" fullWidth value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="맛집 이름이나 방문 후기 제목을 입력해주세요" />

              <FormControl fullWidth>
                <InputLabel>지역 선택</InputLabel>
                <Select value={district} label="지역 선택" onChange={e => setDistrict(e.target.value)}>
                  {DISTRICTS.map(d => <MenuItem key={d} value={d}>📍 {d}</MenuItem>)}
                </Select>
              </FormControl>

              <TextField label="내용" multiline rows={6} fullWidth value={content}
                onChange={e => setContent(e.target.value)}
                placeholder="맛집 정보를 자세히 공유해주세요! (메뉴, 가격, 분위기, 위치 등)" />

              <Box>
                <Typography variant="body2" fontWeight={700} mb={1.5}>📸 이미지</Typography>
                <Button variant="outlined" startIcon={<AddPhotoAlternateIcon />} endIcon={<ShuffleIcon />}
                  onClick={handleRandomImage} sx={{ borderRadius: 2 }}>
                  랜덤 이미지 변경
                </Button>
                {imageUrl && (
                  <Box mt={2} sx={{ position: 'relative' }}>
                    <img src={imageUrl} alt="preview" style={{ width: '100%', maxHeight: 260, objectFit: 'cover', borderRadius: 12 }} />
                    <Button size="small" onClick={() => setImageUrl('')}
                      sx={{ position: 'absolute', top: 8, right: 8, bgcolor: 'rgba(0,0,0,0.5)', color: '#fff', minWidth: 0, px: 1.5, borderRadius: 2, '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' } }}>
                      삭제
                    </Button>
                  </Box>
                )}
              </Box>

              <Box>
                <Typography variant="body2" fontWeight={700} mb={1.5}># 해시태그 (최대 5개)</Typography>
                <Stack direction="row" spacing={1} mb={1.5}>
                  <TextField size="small" placeholder="카페, 맛집, 브런치..."
                    value={hashtagInput} onChange={e => setHashtagInput(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleAddHashtag() } }}
                    sx={{ flex: 1 }} />
                  <Button variant="outlined" size="small" onClick={handleAddHashtag} sx={{ borderRadius: 2, minWidth: 60 }}>추가</Button>
                </Stack>
                {hashtags.length > 0 && (
                  <Stack direction="row" spacing={0.5} flexWrap="wrap">
                    {hashtags.map(tag => (
                      <Chip key={tag} label={`#${tag}`} size="small"
                        onDelete={() => setHashtags(hashtags.filter(t => t !== tag))}
                        sx={{ bgcolor: '#FFF8E7', color: '#A67C52', fontWeight: 600, mb: 0.5 }} />
                    ))}
                  </Stack>
                )}
              </Box>

              <Button variant="contained" size="large" onClick={handleSubmit}
                disabled={submitting || !title.trim() || !content.trim()}
                sx={{ py: 1.6, borderRadius: 3, fontWeight: 700, fontSize: '1rem' }}>
                {submitting ? <CircularProgress size={22} sx={{ color: '#fff' }} /> : '수정 완료'}
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </Box>
  )
}

export default EditPostPage
