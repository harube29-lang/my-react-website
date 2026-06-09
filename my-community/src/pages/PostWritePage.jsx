import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box, Typography, Button, TextField, Paper, Alert,
  MenuItem, Select, FormControl, InputLabel, Chip, Stack, IconButton
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ImageIcon from '@mui/icons-material/Image'
import AutorenewIcon from '@mui/icons-material/Autorenew'
import TagIcon from '@mui/icons-material/Tag'
import { supabase } from '../supabase'

const DISTRICTS = ['동구', '중구', '남구', '울주군', '북구']

const PostWritePage = ({ session }) => {
  const navigate = useNavigate()
  const [form, setForm] = useState({ title: '', content: '', district: '', hashtags: [] })
  const [hashtagInput, setHashtagInput] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [imageLoading, setImageLoading] = useState(false)

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const getRandomImage = () => {
    setImageLoading(true)
    const seed = Math.floor(Math.random() * 1000)
    const url = `https://picsum.photos/seed/${seed}/800/450`
    setImageUrl(url)
    setImageLoading(false)
  }

  const handleHashtagKeyDown = (e) => {
    if ((e.key === 'Enter' || e.key === ' ') && hashtagInput.trim()) {
      e.preventDefault()
      const tag = hashtagInput.trim().replace(/^#/, '')
      if (tag && !form.hashtags.includes(tag) && form.hashtags.length < 5) {
        setForm(prev => ({ ...prev, hashtags: [...prev.hashtags, tag] }))
      }
      setHashtagInput('')
    }
  }

  const removeHashtag = (tag) => setForm(prev => ({ ...prev, hashtags: prev.hashtags.filter(t => t !== tag) }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.title || !form.content) { setError('제목과 내용을 입력해주세요.'); return }
    setLoading(true)
    setError('')
    const { error } = await supabase.from('posts').insert({
      user_id: session.user.id,
      title: form.title,
      content: form.content,
      district: form.district || null,
      hashtags: form.hashtags.length > 0 ? form.hashtags : null,
      image_url: imageUrl || null,
    })
    if (error) {
      setError('게시물 등록에 실패했습니다.')
    } else {
      navigate('/')
    }
    setLoading(false)
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* 헤더 */}
      <Box sx={{ bgcolor: 'white', borderBottom: '1px solid #E8E0D5', position: 'sticky', top: 0, zIndex: 100 }}>
        <Box sx={{ maxWidth: 700, mx: 'auto', px: 3, py: 1.5, display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton onClick={() => navigate(-1)}><ArrowBackIcon /></IconButton>
          <Typography variant="h6" sx={{ fontWeight: 700, flexGrow: 1 }}>게시물 작성</Typography>
          <Button variant="contained" onClick={handleSubmit} disabled={loading}
            sx={{ bgcolor: '#7C9A6D', '&:hover': { bgcolor: '#6A8A5C' } }}>
            {loading ? '등록 중...' : '등록'}
          </Button>
        </Box>
      </Box>

      <Box sx={{ maxWidth: 700, mx: 'auto', px: 3, py: 4 }}>
        {error && <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>{error}</Alert>}

        <Paper elevation={0} sx={{ p: 3, border: '1px solid #E8E0D5', borderRadius: 3 }}>
          <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            {/* 제목 */}
            <TextField
              label="제목" name="title" fullWidth
              value={form.title} onChange={handleChange}
              placeholder="게시물 제목을 입력하세요"
            />

            {/* 구역 선택 */}
            <FormControl fullWidth>
              <InputLabel>구역 선택</InputLabel>
              <Select name="district" value={form.district} onChange={handleChange} label="구역 선택"
                sx={{ borderRadius: 2 }}>
                {DISTRICTS.map(d => <MenuItem key={d} value={d}>{d}</MenuItem>)}
              </Select>
            </FormControl>

            {/* 내용 */}
            <TextField
              label="내용" name="content" fullWidth multiline rows={6}
              value={form.content} onChange={handleChange}
              placeholder="맛집이나 카페에 대한 정보를 공유해보세요!"
            />

            {/* 이미지 */}
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 600, mb: 1, color: 'text.secondary' }}>
                이미지
              </Typography>
              <Button
                variant="outlined" startIcon={imageLoading ? <AutorenewIcon /> : <ImageIcon />}
                onClick={getRandomImage} disabled={imageLoading}
                sx={{ borderColor: '#7C9A6D', color: '#7C9A6D', mb: imageUrl ? 1.5 : 0 }}
              >
                랜덤 이미지 추가
              </Button>
              {imageUrl && (
                <Box sx={{ position: 'relative' }}>
                  <img src={imageUrl} alt="미리보기" style={{ width: '100%', borderRadius: 8, maxHeight: 280, objectFit: 'cover' }} />
                  <Button size="small" onClick={() => setImageUrl('')}
                    sx={{ position: 'absolute', top: 8, right: 8, bgcolor: 'rgba(0,0,0,0.5)', color: 'white', minWidth: 0, p: '4px 10px' }}>
                    삭제
                  </Button>
                </Box>
              )}
            </Box>

            {/* 해시태그 */}
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 600, mb: 1, color: 'text.secondary', display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <TagIcon sx={{ fontSize: 16 }} /> 해시태그 (최대 5개, Enter로 추가)
              </Typography>
              <TextField
                fullWidth value={hashtagInput}
                onChange={(e) => setHashtagInput(e.target.value)}
                onKeyDown={handleHashtagKeyDown}
                placeholder="#해시태그 입력 후 Enter"
                disabled={form.hashtags.length >= 5}
              />
              {form.hashtags.length > 0 && (
                <Stack direction="row" spacing={1} sx={{ mt: 1.5, flexWrap: 'wrap', gap: 1 }}>
                  {form.hashtags.map(tag => (
                    <Chip key={tag} label={`#${tag}`} onDelete={() => removeHashtag(tag)}
                      sx={{ bgcolor: '#EFF4EC', color: '#7C9A6D' }} />
                  ))}
                </Stack>
              )}
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  )
}

export default PostWritePage
