const axios = require('axios');

const AUTH_API_URL = 'https://auth-tkpm.vercel.app/api/auth';
const VIDEO_API_URL = 'http://localhost:3001/api/videos';

// Test user credentials
const testUser = {
  email: 'vyly@example.com',
  password: 'password123' // Replace with actual password
};

// Headers
let headers = {
  'Content-Type': 'application/json'
};

// Test data
const testVideo = {
  videoId: `test_video_${Date.now()}`,
  cloudinaryUrl: 'https://res.cloudinary.com/dvnr2fqlk/video/upload/v1746985144/videos/973bfe2d-cd5d-443c-aab6-2727173bbb66.mp4',
  status: 'processing',
  userId: '681b9225507927782c6057ae', // Add user ID
  metadata: {
    duration: 120,
    numScenes: 5,
    numAudioSegments: 3,
    effects: ['fade'],
    transitions: ['fade']
  }
};

// Authentication function
async function login() {
  try {
    console.log('\n🔐 Logging in...');
    console.log('Login URL:', `${AUTH_API_URL}/login`);
    console.log('Login data:', testUser);
    const response = await axios.post(`${AUTH_API_URL}/login`, testUser);
    const { token, user } = response.data;
    headers['Authorization'] = `Bearer ${token}`;
    headers['userId'] = user.id; // Add user ID to headers
    console.log('✅ Login successful');
    console.log('User ID:', user.id);
    return { token, userId: user.id };
  } catch (error) {
    console.error('❌ Login failed:', error.response?.data || error.message);
    throw error;
  }
}

// Test functions
async function testCreateVideo() {
  try {
    console.log('\n1. Testing Create Video...');
    console.log('Headers:', headers);
    const response = await axios.post(VIDEO_API_URL, testVideo, { headers });
    console.log('✅ Create Video Success:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Create Video Error:', error.response?.data || error.message);
    throw error;
  }
}

async function testGetAllVideos() {
  try {
    console.log('\n2. Testing Get All Videos...');
    const response = await axios.get(VIDEO_API_URL, { headers });
    console.log('✅ Get All Videos Success:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Get All Videos Error:', error.response?.data || error.message);
    throw error;
  }
}

async function testGetVideoById(videoId) {
  try {
    console.log('\n3. Testing Get Video by ID...');
    const response = await axios.get(`${VIDEO_API_URL}/${videoId}`, { headers });
    console.log('✅ Get Video by ID Success:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Get Video by ID Error:', error.response?.data || error.message);
    throw error;
  }
}

async function testUpdateVideoStatus(videoId) {
  try {
    console.log('\n4. Testing Update Video Status...');
    const updateData = {
      status: 'completed',
      metadata: {
        duration: 150,
        numScenes: 6
      }
    };
    const response = await axios.put(`${VIDEO_API_URL}/${videoId}/status`, updateData, { headers });
    console.log('✅ Update Video Status Success:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Update Video Status Error:', error.response?.data || error.message);
    throw error;
  }
}

async function testGetVideoStatus(videoId) {
  try {
    console.log('\n5. Testing Get Video Status...');
    const response = await axios.get(`${VIDEO_API_URL}/${videoId}/status`, { headers });
    console.log('✅ Get Video Status Success:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Get Video Status Error:', error.response?.data || error.message);
    throw error;
  }
}

async function testDeleteVideo(videoId) {
  try {
    console.log('\n6. Testing Delete Video...');
    const response = await axios.delete(`${VIDEO_API_URL}/${videoId}`, { headers });
    console.log('✅ Delete Video Success:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Delete Video Error:', error.response?.data || error.message);
    throw error;
  }
}

// Run all tests
async function runTests() {
  try {
    console.log('🚀 Starting Video Manager API Tests...');
    
    // Login first
    await login();
    
    // Create a video
    const createdVideo = await testCreateVideo();
    const videoId = createdVideo.videoId;

    // Get all videos
    await testGetAllVideos();

    // Get video by ID
    await testGetVideoById(videoId);

    // Update video status
    await testUpdateVideoStatus(videoId);

    // Get video status
    await testGetVideoStatus(videoId);

    // Delete video
    // await testDeleteVideo(videoId);

    console.log('\n✨ All tests completed successfully!');
  } catch (error) {
    console.error('\n❌ Test suite failed:', error.message);
  }
}

// Run the tests
runTests(); 