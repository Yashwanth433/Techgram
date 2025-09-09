import React, { useState } from 'react';
import '../App.css';
import { createPost, createProject } from '../api';

function CreatePage() {
  const [activeTab, setActiveTab] = useState('post');

  // Post form states
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [category, setCategory] = useState('');
  const [postMsg, setPostMsg] = useState('');

  // Project form states
  const [projectName, setProjectName] = useState('');
  const [technologies, setTechnologies] = useState('');
  const [screenshots, setScreenshots] = useState([]);
  const [video, setVideo] = useState(null);
  const [projectFile, setProjectFile] = useState(null);
  const [projectMsg, setProjectMsg] = useState('');

  const categories = [
    'Python', 'Java', 'JavaScript', 'C++', 'C#', 'PHP', 'Ruby', 'Go', 'Rust', 'Swift',
    'Kotlin', 'Scala', 'TypeScript', 'HTML/CSS', 'React', 'Angular', 'Vue.js', 'Node.js',
    'Express.js', 'Django', 'Flask', 'Spring Boot', 'ASP.NET', 'Laravel', 'Ruby on Rails',
    'Docker', 'Kubernetes', 'AWS', 'Azure', 'GCP'
  ];

  const handlePostSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      setPostMsg('Please select an image.');
      return;
    }
    if (!description.trim()) {
      setPostMsg('Description cannot be empty.');
      return;
    }
    if (!category) {
      setPostMsg('Please select a category.');
      return;
    }

    const username = localStorage.getItem('username');
    if (!username) {
      setPostMsg('User not logged in.');
      return;
    }

    const formData = new FormData();
    formData.append('username', username);
    formData.append('image', image);
    formData.append('description', description);
    formData.append('tags', tags);
    formData.append('category', category);

    try {
      const res = await createPost(formData);
      if (res.data.success) {
        setPostMsg('Post created successfully!');
        // Reset form
        setImage(null);
        setDescription('');
        setTags('');
        setCategory('');
      } else {
        setPostMsg(res.data.message);
      }
    } catch (err) {
      setPostMsg('Error creating post');
    }
  };

  const handleProjectSubmit = async (e) => {
    e.preventDefault();

    if (!projectName.trim()) {
      setProjectMsg('Project name cannot be empty.');
      return;
    }
    if (!technologies.trim()) {
      setProjectMsg('Technologies cannot be empty.');
      return;
    }

    const username = localStorage.getItem('username');
    if (!username) {
      setProjectMsg('User not logged in.');
      return;
    }

    const formData = new FormData();
    formData.append('username', username);
    formData.append('projectName', projectName);
    formData.append('technologies', technologies);

    screenshots.forEach((screenshot, index) => {
      formData.append('screenshots', screenshot);
    });

    if (video) {
      formData.append('video', video);
    }

    if (projectFile) {
      formData.append('projectFile', projectFile);
    }

    try {
      const res = await createProject(formData);
      if (res.data.success) {
        setProjectMsg('Project created successfully!');
        // Reset form
        setProjectName('');
        setTechnologies('');
        setScreenshots([]);
        setVideo(null);
        setProjectFile(null);
      } else {
        setProjectMsg(res.data.message);
      }
    } catch (err) {
      setProjectMsg('Error creating project');
    }
  };

  return (
    <div className="home-container">
      <div className="form-card">
        {/* Tab Slider */}
        <div className="tab-slider">
          <button
            className={`tab-button ${activeTab === 'post' ? 'active' : ''}`}
            onClick={() => setActiveTab('post')}
          >
            Post
          </button>
          <button
            className={`tab-button ${activeTab === 'project' ? 'active' : ''}`}
            onClick={() => setActiveTab('project')}
          >
            Project
          </button>
        </div>

        {activeTab === 'post' && (
          <>
            <h2>Create New Post</h2>
            <form onSubmit={handlePostSubmit}>
              <div className="input-group">
                <label htmlFor="image">Image</label>
                <input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={e => setImage(e.target.files[0])}
                />
              </div>
              <div className="input-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="Describe your post"
                  rows="4"
                />
              </div>
              <div className="input-group">
                <label htmlFor="tags">Tags (optional)</label>
                <input
                  id="tags"
                  type="text"
                  value={tags}
                  onChange={e => setTags(e.target.value)}
                  placeholder="e.g. #tech #coding"
                />
              </div>
              <div className="input-group">
                <label htmlFor="category">Category</label>
                <select
                  id="category"
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                >
                  <option value="">Select a category</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <button type="submit" className="btn">Create Post</button>
            </form>
            <div className={`message ${postMsg.includes('successfully') ? 'success' : postMsg ? 'error' : ''}`}>
              {postMsg}
            </div>
          </>
        )}

        {activeTab === 'project' && (
          <>
            <h2>Create New Project</h2>
            <form onSubmit={handleProjectSubmit}>
              <div className="input-group">
                <label htmlFor="projectName">Project Name</label>
                <input
                  id="projectName"
                  type="text"
                  value={projectName}
                  onChange={e => setProjectName(e.target.value)}
                  placeholder="Enter project name"
                />
              </div>
              <div className="input-group">
                <label htmlFor="technologies">Technologies Used</label>
                <textarea
                  id="technologies"
                  value={technologies}
                  onChange={e => setTechnologies(e.target.value)}
                  placeholder="List all technologies used (e.g. React, Node.js, MongoDB)"
                  rows="3"
                />
              </div>
              <div className="input-group">
                <label htmlFor="screenshots">Project Screenshots</label>
                <input
                  id="screenshots"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={e => setScreenshots(Array.from(e.target.files))}
                />
              </div>
              <div className="input-group">
                <label htmlFor="video">Project Video (optional)</label>
                <input
                  id="video"
                  type="file"
                  accept="video/*"
                  onChange={e => setVideo(e.target.files[0])}
                />
              </div>
              <div className="input-group">
                <label htmlFor="projectFile">Project File (max 20MB)</label>
                <input
                  id="projectFile"
                  type="file"
                  onChange={e => setProjectFile(e.target.files[0])}
                />
              </div>
              <button type="submit" className="btn">Create Project</button>
            </form>
            <div className={`message ${projectMsg.includes('successfully') ? 'success' : projectMsg ? 'error' : ''}`}>
              {projectMsg}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CreatePage;
