import request from 'supertest';
import app from '../../app';


describe('Course Routes', () => {
  
  it('GET / should return all courses', async () => {
    const response = await request(app).get('/api/courses/');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body));
  });

  it('POST /create should add a new course', async () => {
    const newCourse = { title: 'New Course', 
      description: 'Course Description', 
    modules: [
      {
        "title": "HTML Basics",
        "lessons": [
          {
            "title": "Understanding HTML Structure",
            "description": "Learn about HTML tags and document structure",
            "topics": [
              "HTML tags",
              "Document structure",
              "Semantic HTML"
            ],
            "content": [
              {
                "type": "text",
                "data": "HTML (HyperText Markup Language) is the standard markup language for documents designed to be displayed in a web browser."
              },
              {
                "type": "video",
                "data": "https://example.com/intro-to-html-video"
              }
            ]
          },
          {
            "title": "Working with Forms",
            "description": "Create and style HTML forms",
            "topics": [
              "Form elements",
              "Input types",
              "Form validation"
            ],
            "content": [
              {
                "type": "text",
                "data": "HTML forms are used to collect user input. Learn how to create effective and accessible forms."
              },
              {
                "type": "audio",
                "data": "https://example.com/html-forms-audio"
              }
            ]
          }
        ]
      },
      {
        "title": "CSS Fundamentals",
        "lessons": [
          {
            "title": "CSS Selectors and Properties",
            "description": "Master CSS selectors and common properties",
            "topics": [
              "Selectors",
              "Box model",
              "Colors and typography"
            ],
            "content": [
              {
                "type": "text",
                "data": "CSS (Cascading Style Sheets) is used to style and layout web pages."
              },
              {
                "type": "video",
                "data": "https://example.com/css-selectors-video"
              }
            ]
          }
        ]
      }
    ] };
    const response = await request(app).post('/api/courses/create').send(newCourse);
    expect(response.status).toBe(201);
    expect(response.body).toMatchObject(newCourse);
  });

  it('PUT /update/:id should update a course', async () => {
    const updatedCourse = { title: 'Updated Course', description: 'Updated Description', modules: [
      {
        "title": "HTML Basics",
        "lessons": [
          {
            "title": "Understanding HTML Structure",
            "description": "Learn about HTML tags and document structure",
            "topics": [
              "HTML tags",
              "Document structure",
              "Semantic HTML"
            ],
            "content": [
              {
                "type": "text",
                "data": "HTML (HyperText Markup Language) is the standard markup language for documents designed to be displayed in a web browser."
              },
              {
                "type": "video",
                "data": "https://example.com/intro-to-html-video"
              }
            ]
          },
          {
            "title": "Working with Forms",
            "description": "Create and style HTML forms",
            "topics": [
              "Form elements",
              "Input types",
              "Form validation"
            ],
            "content": [
              {
                "type": "text",
                "data": "HTML forms are used to collect user input. Learn how to create effective and accessible forms."
              },
              {
                "type": "audio",
                "data": "https://example.com/html-forms-audio"
              }
            ]
          }
        ]
      },
      {
        "title": "CSS Fundamentals",
        "lessons": [
          {
            "title": "CSS Selectors and Properties",
            "description": "Master CSS selectors and common properties",
            "topics": [
              "Selectors",
              "Box model",
              "Colors and typography"
            ],
            "content": [
              {
                "type": "text",
                "data": "CSS (Cascading Style Sheets) is used to style and layout web pages."
              },
              {
                "type": "video",
                "data": "https://example.com/css-selectors-video"
              }
            ]
          }
        ]
      }
    ] };
    const response = await request(app).put('/api/courses/update/5').send(updatedCourse);
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(updatedCourse);
  });

  it('DELETE /remove/:id should delete a course', async () => {
    const response = await request(app).delete('/api/courses/remove/4');
    expect(response.status).toBe(200);
  });
});