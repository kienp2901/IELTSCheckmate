import React, { useState, useRef, useEffect } from 'react';
import { Box, IconButton, TextField, Paper, Typography } from '@mui/material';
import { Close, Send, Chat } from '@mui/icons-material';
import { apiRemote } from '@/api';
import logoAnswer from '@/images/logo_answer.jpeg';
import logoQuestion from '@/images/logo_question.jpeg';

interface Message {
  content: string;
  isUser: boolean;
}

interface ChatMessage {
  username: string;
  role: 'user' | 'assistant';
  content: string;
  show: boolean;
  time: number;
  to?: string;
}

const Chatbox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFirstOpen, setIsFirstOpen] = useState(true);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const fetchChatHistory = async () => {
    try {
      const response = await apiRemote.getChatHistory();
      if (response.code === 200 && response.data?.content) {
        const historyData: ChatMessage[] = JSON.parse(response.data.content);
        // Chuyển đổi format tin nhắn từ history sang format hiện tại
        const formattedMessages = historyData
          .filter(msg => msg.show !== false)
          .map(msg => ({
            content: msg.content,
            isUser: msg.role === 'user'
          }));
        setMessages(formattedMessages);
      } else if (response.code === 404) {
        // gửi tin nhắn kích hoạt
        try {
            const initResponse = await apiRemote.chat(
              'Based on the course completion data provided, please give personalized advice to help the student improve their learning outcomes.',
              'is-first'
            );
            // Hiển thị response của tin nhắn kích hoạt
            if (initResponse.messageResponse) {
              setMessages([
                { 
                  content: initResponse.messageResponse,
                  isUser: false 
                }
              ]);
            }
        } catch (error) {
            console.error('Error sending initial message:', error);
        }
      }
    } catch (error) {
      console.error('Error fetching chat history:', error);
    }
  };

  const handleOpenChat = () => {
    setIsOpen(true);
    if (isFirstOpen) {
      fetchChatHistory();
      setIsFirstOpen(false);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    setIsLoading(true);
    // Thêm tin nhắn của người dùng
    setMessages(prev => [...prev, { content: inputMessage, isUser: true }]);
    
    try {
      // Thêm tin nhắn loading
      setMessages(prev => [...prev, { content: 'Loading ...', isUser: false }]);
      
      // Gọi API ở đây
      const response = await apiRemote.chat(inputMessage, '');
      
      // Xóa tin nhắn loading và thêm phản hồi từ bot
      setMessages(prev => {
        const newMessages = [...prev];
        newMessages.pop(); // Xóa tin nhắn loading
        return [...newMessages, { content: response.messageResponse, isUser: false }];
      });
    } catch (error) {
      console.error('Error sending message:', error);
      // Xóa tin nhắn loading và thêm thông báo lỗi
      setMessages(prev => {
        const newMessages = [...prev];
        newMessages.pop(); // Xóa tin nhắn loading
        return [...newMessages, { content: 'Có lỗi xảy ra, vui lòng thử lại!', isUser: false }];
      });
    } finally {
      setIsLoading(false);
      setInputMessage('');
    }
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 20,
        right: 20,
        zIndex: 1000,
      }}
    >
      {isOpen ? (
        <Paper
          elevation={3}
          sx={{
            width: 350,
            height: 500,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Header */}
          <Box
            sx={{
              p: 2,
              bgcolor: '#673ab7',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <svg 
                viewBox="0 0 640 512" 
                title="robot" 
                style={{ width: '20px', height: '20px' }}
              >
                <path 
                  fill="currentColor" 
                  d="M32,224H64V416H32A31.96166,31.96166,0,0,1,0,384V256A31.96166,31.96166,0,0,1,32,224Zm512-48V448a64.06328,64.06328,0,0,1-64,64H160a64.06328,64.06328,0,0,1-64-64V176a79.974,79.974,0,0,1,80-80H288V32a32,32,0,0,1,64,0V96H464A79.974,79.974,0,0,1,544,176ZM264,256a40,40,0,1,0-40,40A39.997,39.997,0,0,0,264,256Zm-8,128H192v32h64Zm96,0H288v32h64ZM456,256a40,40,0,1,0-40,40A39.997,39.997,0,0,0,456,256Zm-8,128H384v32h64ZM640,256V384a31.96166,31.96166,0,0,1-32,32H576V224h32A31.96166,31.96166,0,0,1,640,256Z"
                />
              </svg>
              <Typography>PLearn</Typography>
            </Box>
            <IconButton onClick={() => setIsOpen(false)} sx={{ color: 'white' }}>
              <Close />
            </IconButton>
          </Box>

          {/* Messages */}
          <Box
            sx={{
              flex: 1,
              overflow: 'auto',
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              bgcolor: '#f8f9fa',
            }}
          >
            {messages.map((msg, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 1,
                  flexDirection: msg.isUser ? 'row-reverse' : 'row',
                }}
              >
                <img 
                  src={msg.isUser ? logoAnswer : logoQuestion}
                  alt={msg.isUser ? "User" : "Bot"}
                  style={{ 
                    width: 32, 
                    height: 32, 
                    borderRadius: '50%',
                    objectFit: 'cover'
                  }}
                />
                <Paper
                  sx={{
                    p: 1.5,
                    maxWidth: '70%',
                    bgcolor: msg.isUser ? '#e3f2fd' : 'white',
                    borderRadius: 2,
                    boxShadow: 'none',
                    border: '1px solid #e0e0e0',
                  }}
                >
                  <Typography 
                    sx={{ 
                      fontSize: '0.9rem',
                      lineHeight: 1.5,
                      color: '#333',
                      whiteSpace: 'pre-wrap'
                    }}
                  >
                    {msg.content}
                  </Typography>
                </Paper>
              </Box>
            ))}
            <div ref={messagesEndRef} />
          </Box>

          {/* Input */}
          <Box 
            sx={{ 
              p: 2, 
              display: 'flex', 
              gap: 1,
              borderTop: '1px solid #e0e0e0',
              bgcolor: 'white'
            }}
          >
            <TextField
              fullWidth
              size="small"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSendMessage()}
              placeholder="Nhập tin nhắn..."
              disabled={isLoading}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  '& fieldset': {
                    borderColor: '#e0e0e0',
                  },
                  '&:hover fieldset': {
                    borderColor: '#673ab7',
                  },
                },
              }}
            />
            <IconButton 
              onClick={handleSendMessage} 
              disabled={isLoading || !inputMessage.trim()}
              sx={{
                bgcolor: '#673ab7',
                color: 'white',
                '&:hover': {
                  bgcolor: '#5e35b1',
                },
                '&.Mui-disabled': {
                  bgcolor: '#9e9e9e',
                  color: 'rgba(255, 255, 255, 0.7)',
                },
              }}
            >
              <Send />
            </IconButton>
          </Box>
        </Paper>
      ) : (
        <IconButton
          onClick={handleOpenChat}
          sx={{
            width: 60,
            height: 60,
            bgcolor: '#673ab7',
            color: 'white',
            '&:hover': {
              bgcolor: '#5e35b1',
            },
          }}
        >
          <Chat sx={{ width: 30, height: 30 }} />
        </IconButton>
      )}
    </Box>
  );
};

export default Chatbox; 