import axios from 'axios';
import io from 'socket.io-client';

const API_BASE_URL = 'http://localhost:5000';
const socket = io(API_BASE_URL);

// REST API calls
export const sendGeneralChat = async (message) => {
  const res = await axios.post(`${API_BASE_URL}/api/chat/general`, { message });
  return res.data.response;
};

export const sendQAChat = async (question) => {
  const res = await axios.post(`${API_BASE_URL}/api/chat/qa`, { question });
  return res.data.response;
};

export const sendPDFChat = async (formData) => {
  const res = await axios.post(`${API_BASE_URL}/api/chat/pdf`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return res.data.response;
};

export const sendExcelChat = async (formData) => {
  const res = await axios.post(`${API_BASE_URL}/api/chat/excel`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return res.data.response;
};

export const sendNotebookChat = async (cell) => {
  const res = await axios.post(`${API_BASE_URL}/api/chat/notebook`, { cell });
  return res.data.response;
};

// WebSocket functions for real-time chat
export const connectSocket = () => {
  socket.connect();
};

export const disconnectSocket = () => {
  socket.disconnect();
};

export const sendMessage = async (botType, message, file = null) => {
  let fileData = null;
  
  if (file) {
    // Convert File object to format expected by backend
    const arrayBuffer = await file.arrayBuffer();
    fileData = {
      name: file.name,
      data: new Uint8Array(arrayBuffer)
    };
  }
  
  socket.emit('send_message', { bot_type: botType, message, file: fileData });
};

export const onMessageReceived = (callback) => {
  socket.on('message_received', callback);
};

export const onStreamResponse = (callback) => {
  socket.on('stream_response', callback);
};

export const offMessageReceived = () => {
  socket.off('message_received');
};

export const offStreamResponse = () => {
  socket.off('stream_response');
};

export const sendExcelAnalytics = (sheetName, analysisType = 'comprehensive') => {
  socket.emit('excel_analytics', { sheet_name: sheetName, analysis_type: analysisType });
};

export const sendExcelCleaning = (operations, sheetName) => {
  socket.emit('excel_cleaning', { operations, sheet_name: sheetName });
};

// Example for uploadExcel
export const uploadExcel = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  const res = await fetch('/api/excel/upload', { method: 'POST', body: formData });
  const result = await res.json();
  return result;
};
// Repeat this pattern for all Excel endpoints: query, clean, analytics, chart, etc.
// Always return the full standardized response object.
