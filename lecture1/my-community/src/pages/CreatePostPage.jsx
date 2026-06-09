import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
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
const RANDOM_SEEDS = ['food', 'cafe', 'restaurant', 'coffee', 'dessert', 'meal', 'bakery']

const CreatePostPage = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [district, setDistrict] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [hashtagInput, setHashtagInput] = useState('')
  const [hashtags, setHashtags] = useState([])
  const [loadingImage, setLoadingImage] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) navigate('/login', { state: { from: '/create' } })
      else setUser(session.user)
    })
  }, [navigate])

  const handleRandomImage = () => {
    const seed = RANDOM_SEEDS[Math.floor(Math.random() * RANDOM_SEEDS.length)] + Math.floor(Math.random() * 999)
    setImageUrl(`https://picsum.photos/seed/${seed}/800/500`)
  }

  const handleAddHashtag = () => {
    const tag = hashtagInput.trim().replace(/^#/, '')
    if (tag && !hashtags.includes(tag) && hashtags.length < 5) {
      setHashtags([...hashtags, tag])
      setHashtagInput('')
    }
  }

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      setError('제목과 내용을 입력해주세요.')
      return
    }
    if (!user) {
      navigate('/login', { state: { from: '/create' } })
      return
    }
    setSubmitting(true)
    setError('')

    const { error: err } = await supabase.from('posts').insert({
      user_id: user.id,
      title: title.trim(),
      content: content.trim(),
      district: district || null,
      image_url: imageUrl || null,
      hashtags: hashtags.length > 0 ? hashtags : null,
    })

    setSubmitting(false)
    if (err) {
      setError(`등록 실패: ${err.message}`)
      return
    }
    navigate('/')
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#FAF7F2' }}>
      {/* 헤더 */}
      <Box sx={{ bgcolor: 'primary.main', color: '#fff', py: 2, px: 3, display: 'flex', alignItems: 'center', gap: 1, position: 'sticky', top: 0, zIndex: 100 }}>
        <IconButton size="small" onClick={() => navigate('/')} sx={{ color: '#fff' }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h6" fontWeight={700}>게시물 작성</Typography>
      </Box>

      <Box sx={{ maxWidth: 720, mx: 'auto', p: 3 }}>
        <Card sx={{ borderRadius: 3 }}>
          <CardContent sx={{ p: 3 }}>
            <Stack spacing={3}>
              {error && <Alert severity="error" sx={{ borderRadius: 2 }}>{error}</Alert>}

              <TextField
                label="제목"
                fullWidth
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="맛집 이름이나 방문 후기 제목을 입력해주세요"
              />

              <FormControl fullWidth>
                <InputLabel>지역 선택</InputLabel>
                <Select value={district} label="지역 선택" onChange={e => setDistrict(e.target.value)}>
                  {DISTRICTS.map(d => <MenuItem key={d} value={d}>📍 {d}</MenuItem>)}
                </Select>
              </FormControl>

              <TextField
                label="내용"
                multiline
                rows={6}
                fullWidth
                value={content}
                onChange={e => setContent(e.target.value)}
                placeholder="맛집 정보를 자세히 공유해주세요! (메뉴, 가격, 분위기, 위치 등)"
              />

              {/* 이미지 */}
              <Box>
                <Typography variant="body2" fontWeight={700} mb={1.5}>📸 이미지</Typography>
                <Button
                  variant="outlined"
                  startIcon={<AddPhotoAlternateIcon />}
                  endIcon={loadingImage ? <CircularProgress size={14} /> : <ShuffleIcon />}
                  onClick={handleRandomImage}
                  disabled={loadingImage}
                  sx={{ borderRadius: 2 }}
                >
                  랜덤 이미지 추가
                </Button>
                {imageUrl && (
                  <Box mt={2} sx={{ position: 'relative' }}>
                    <img src={imageUrl} alt="preview" style={{ width: '100%', maxHeight: 260, objectFit: 'cover', borderRadius: 12 }} />
                    <Button
                      size="small"
                      onClick={() => setImageUrl('')}
                      sx={{ position: 'absolute', top: 8, right: 8, bgcolor: 'rgba(0,0,0,0.5)', color: '#fff', minWidth: 0, px: 1.5, borderRadius: 2, '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' } }}
                    >
                      삭제
                    </Button>
                  </Box>
                )}
              </Box>

              {/* 해시태그 */}
              <Box>
                <Typography variant="body2" fontWeight={700} mb={1.5}># 해시태그 (최대 5개)</Typography>
                <Stack direction="row" spacing={1} mb={1.5}>
                  <TextField
                    size="small"
                    placeholder="카페, 맛집, 브런치..."
                    value={hashtagInput}
                    onChange={e => setHashtagInput(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleAddHashtag() } }}
                    sx={{ flex: 1 }}
                  />
                  <Button variant="outlined" size="small" onClick={handleAddHashtag} sx={{ borderRadius: 2, minWidth: 60 }}>추가</Button>
                </Stack>
                {hashtags.length > 0 && (
                  <Stack direction="row" spacing={0.5} flexWrap="wrap">
                    {hashtags.map(tag => (
                      <Chip
                        key={tag}
                        label={`#${tag}`}
                        size="small"
                        onDelete={() => setHashtags(hashtags.filter(t => t !== tag))}
                        sx={{ bgcolor: '#FFF8E7', color: '#A67C52', fontWeight: 600, mb: 0.5 }}
                      />
                    ))}
                  </Stack>
                )}
              </Box>

              <Button
                variant="contained"
                size="large"
                onClick={handleSubmit}
                disabled={submitting || !title.trim() || !content.trim()}
                sx={{ py: 1.5, borderRadius: 3, fontWeight: 700, fontSize: '1rem' }}
              >
                {submitting ? <CircularProgress size={22} sx={{ color: '#fff' }} /> : '게시물 등록하기'}
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </Box>
  )
}

export default CreatePostPage
