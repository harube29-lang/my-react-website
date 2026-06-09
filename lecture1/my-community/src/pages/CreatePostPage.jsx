import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box, Typography, TextField, Button, Card, CardContent,
  Chip, Stack, MenuItem, Select, FormControl, InputLabel, IconButton, CircularProgress, Alert
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ShuffleIcon from '@mui/icons-material/Shuffle'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'
import { supabase } from '../utils/supabase'

const DISTRICTS = ['동구', '중구', '남구', '울주군', '북구']
const RANDOM_IMAGE_CATEGORIES = ['food', 'cafe', 'restaurant', 'coffee', 'dessert']

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
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) navigate('/login')
      else setUser(user)
    })
  }, [navigate])

  const handleRandomImage = async () => {
    setLoadingImage(true)
    const category = RANDOM_IMAGE_CATEGORIES[Math.floor(Math.random() * RANDOM_IMAGE_CATEGORIES.length)]
    const seed = Math.floor(Math.random() * 1000)
    const url = `https://picsum.photos/seed/${category}${seed}/800/500`
    setImageUrl(url)
    setLoadingImage(false)
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
    if (err) { setError('게시물 등록에 실패했습니다.'); return }
    navigate('/board')
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Box sx={{ bgcolor: 'primary.main', color: '#fff', py: 2, px: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
        <IconButton size="small" onClick={() => navigate('/board')} sx={{ color: '#fff' }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h6" fontWeight={700}>게시물 작성</Typography>
      </Box>

      <Box sx={{ maxWidth: 720, mx: 'auto', p: 3 }}>
        <Card>
          <CardContent>
            <Stack spacing={3}>
              {error && <Alert severity="error">{error}</Alert>}

              <TextField label="제목" fullWidth value={title} onChange={(e) => setTitle(e.target.value)} />

              <FormControl fullWidth>
                <InputLabel>지역 선택</InputLabel>
                <Select value={district} label="지역 선택" onChange={(e) => setDistrict(e.target.value)}>
                  {DISTRICTS.map((d) => <MenuItem key={d} value={d}>{d}</MenuItem>)}
                </Select>
              </FormControl>

              <TextField
                label="내용"
                multiline
                rows={6}
                fullWidth
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="맛집 정보를 자세히 공유해주세요!"
              />

              <Box>
                <Typography variant="body2" fontWeight={600} mb={1}>이미지</Typography>
                <Button
                  variant="outlined"
                  startIcon={loadingImage ? <CircularProgress size={16} /> : <ShuffleIcon />}
                  onClick={handleRandomImage}
                  disabled={loadingImage}
                >
                  <AddPhotoAlternateIcon sx={{ mr: 0.5 }} />
                  랜덤 이미지 추가
                </Button>
                {imageUrl && (
                  <Box mt={1.5}>
                    <img src={imageUrl} alt="preview" style={{ width: '100%', maxHeight: 220, objectFit: 'cover', borderRadius: 12 }} />
                  </Box>
                )}
              </Box>

              <Box>
                <Typography variant="body2" fontWeight={600} mb={1}>해시태그 (최대 5개)</Typography>
                <Stack direction="row" spacing={1} mb={1}>
                  <TextField
                    size="small"
                    placeholder="#카페 #맛집"
                    value={hashtagInput}
                    onChange={(e) => setHashtagInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddHashtag() } }}
                  />
                  <Button variant="outlined" size="small" onClick={handleAddHashtag}>추가</Button>
                </Stack>
                <Stack direction="row" spacing={0.5} flexWrap="wrap">
                  {hashtags.map((tag) => (
                    <Chip key={tag} label={`#${tag}`} size="small" onDelete={() => setHashtags(hashtags.filter((t) => t !== tag))} sx={{ bgcolor: '#E9C46A33', mb: 0.5 }} />
                  ))}
                </Stack>
              </Box>

              <Button variant="contained" size="large" onClick={handleSubmit} disabled={submitting}>
                {submitting ? '등록 중...' : '게시물 등록'}
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </Box>
  )
}

export default CreatePostPage
