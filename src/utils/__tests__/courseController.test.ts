import { Request, Response, NextFunction } from 'express';
import { readData, writeData } from '../fileHandler';
import { createCourse, deleteCourse, getAllCourses, updateCourse } from '../../controllers/courseController';


jest.mock('../fileHandler');

describe('Course Controller', () => {
  const mockCourses = [
    { id: 1, title: 'Course 1', description: 'Description 1', modules: [
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
      ]  },
    { id: 2, title: 'Course 2', description: 'Description 2' , modules: [
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
      ]},
  ];

  beforeEach(() => {
    (readData as jest.Mock).mockReturnValue(mockCourses);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllCourses', () => {
    it('should return all courses', () => {
      const req = {} as Request;
      const res = { json: jest.fn(), status: jest.fn().mockReturnThis() } as unknown as Response;
      const next = jest.fn();

      getAllCourses(req, res, next);
      expect(res.status);
    });
  });

  describe('createCourse', () => {
    it('should add a new course', () => {
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
      const req = { body: newCourse } as Request;
      const res = { json: jest.fn(), status: jest.fn().mockReturnThis() } as unknown as Response;
      const next = jest.fn();

      createCourse(req, res, next);

      expect(writeData).toHaveBeenCalled();
      expect(res.status);
    });
  });

  describe('updateCourse', () => {
    it('should update an existing course', () => {
        const updatedCourse = { title: 'Updated Course', 
            description: 'Updated Course Description', 
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
      const req = { params: { id: '5' }, body: updatedCourse } as unknown as Request;
      const res = { json: jest.fn(), status: jest.fn().mockReturnThis() } as unknown as Response;
      const next = jest.fn();

      updateCourse(req, res, next);

      expect(writeData).toHaveBeenCalled();
      expect(res.status);
    });
  });

  describe('deleteCourse', () => {
    it('should delete a course', () => {
      const req = { params: { id: '5' } } as unknown as Request;
      const res = { json: jest.fn(), status: jest.fn().mockReturnThis() } as unknown as Response;
      const next = jest.fn();

      deleteCourse(req, res, next);

      expect(writeData).toHaveBeenCalled();
      expect(res.status);
    });
  });
});
