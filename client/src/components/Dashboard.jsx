import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Dashboard() {
  const [user, setUser] = useState(null)
  const [resumes, setResumes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    summary: '',
    skills: ''
  })
  const navigate = useNavigate()

  useEffect(() => {
    fetchUserData()
    fetchResumes()
  }, [])

  const fetchUserData = async () => {
    try {
      const response = await fetch('/api/me')
      if (response.ok) {
        const data = await response.json()
        setUser(data.user)
      } else {
        navigate('/login')
      }
    } catch (err) {
      navigate('/login')
    } finally {
      setLoading(false)
    }
  }

  const fetchResumes = async () => {
    try {
      const response = await fetch('/api/resumes')
      if (response.ok) {
        const data = await response.json()
        setResumes(data.resumes)
      }
    } catch (err) {
      console.error('Failed to fetch resumes:', err)
    }
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/logout', { method: 'POST' })
      navigate('/login')
    } catch (err) {
      console.error('Logout error:', err)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    const resumeData = {
      ...formData,
      skills: formData.skills.split(',').map(s => s.trim()).filter(s => s)
    }

    try {
      const response = await fetch('/api/resumes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(resumeData)
      })

      const data = await response.json()

      if (response.ok) {
        setSuccess('Resume submitted successfully!')
        setFormData({ name: '', email: '', summary: '', skills: '' })
        fetchResumes()
      } else {
        setError(data.error || 'Failed to submit resume')
      }
    } catch (err) {
      setError('Network error. Please try again.')
    }
  }

  if (loading) {
    return <div className="loading">Loading...</div>
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="container">
          <h1>Based Resume Screening Platform</h1>
          <div className="user-info">
            <span>Welcome, {user?.full_name || user?.username}</span>
            <button onClick={handleLogout} className="btn-secondary">
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-card">
              <h3>Total Resumes</h3>
              <div className="stat-value">{resumes.length}</div>
            </div>
            <div className="stat-card">
              <h3>Account Email</h3>
              <div className="stat-value" style={{ fontSize: '18px' }}>{user?.email}</div>
            </div>
            <div className="stat-card">
              <h3>Member Since</h3>
              <div className="stat-value" style={{ fontSize: '18px' }}>
                {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
              </div>
            </div>
          </div>

          <h2 className="section-title">Submit a New Resume</h2>
          <div className="resume-form">
            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}

            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Candidate Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Candidate Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="summary">Summary</label>
                <input
                  type="text"
                  id="summary"
                  name="summary"
                  value={formData.summary}
                  onChange={handleChange}
                  placeholder="Brief professional summary"
                />
              </div>

              <div className="form-group">
                <label htmlFor="skills">Skills (comma-separated)</label>
                <input
                  type="text"
                  id="skills"
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  placeholder="e.g. JavaScript, React, Node.js, MongoDB"
                />
              </div>

              <button type="submit" className="btn btn-primary">
                Submit Resume
              </button>
            </form>
          </div>

          <h2 className="section-title">Submitted Resumes</h2>
          <div className="resume-list">
            {resumes.length === 0 ? (
              <div className="empty-state">
                <p>No resumes submitted yet. Submit your first resume above!</p>
              </div>
            ) : (
              resumes.map((resume, index) => (
                <div key={resume._id || index} className="resume-item">
                  <h4>{resume.name}</h4>
                  <p><strong>Email:</strong> {resume.email}</p>
                  {resume.summary && <p><strong>Summary:</strong> {resume.summary}</p>}
                  {resume.skills && resume.skills.length > 0 && (
                    <div>
                      {resume.skills.map((skill, idx) => (
                        <span key={idx} className="skills-tag">{skill}</span>
                      ))}
                    </div>
                  )}
                  <p style={{ fontSize: '12px', color: '#a0aec0', marginTop: '8px' }}>
                    Submitted: {new Date(resume.created_at).toLocaleString()}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
