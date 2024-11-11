import { Request, Response, NextFunction } from 'express';
import { readData, writeData } from '../utils/fileHandler';
import { MyError } from '../utils/MyError';
import logger from '../utils/logger';
import { RequestHandler } from 'express';

const COURSE_FILE = 'courses.json';

const cache: { [key: string]: any } = {};


export const getAllCourses: RequestHandler = (req, res, next) => {
  try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const cacheKey = `page-${page}-limit-${limit}`;
  
      if (cache[cacheKey]) {
          logger.info(`Cache hit for ${cacheKey}`);
          res.status(200).json(cache[cacheKey]);
          return;
      }
  
      const courses = readData(COURSE_FILE);
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedCourses = courses.slice(startIndex, endIndex);
  
      const response = {
          data: paginatedCourses,
          page,
          limit,
          total: courses.length,
      };
  
      cache[cacheKey] = response;
      res.status(200).json(response);
  } catch (error) {
      logger.error('Failed to fetch paginated courses with caching', { error });
      next(error);
  }
};


export const getCourseById = (req: Request, res: Response, next: NextFunction) => {
    try {
        const courses = readData(COURSE_FILE);
        const course = courses.find((c: any) => c.id === parseInt(req.params.id));
    
        if (!course) {
          throw new MyError('Course not found', 404);
        }
    
        logger.info(`Fetched course with ID ${req.params.id}`, { courseId: req.params.id });
        res.status(200).json(course);
      } catch (error) {
        logger.error(`Failed to fetch course with ID ${req.params.id}`, { error });
        next(error);
      }
};


export const createCourse = (req: Request, res: Response, next: NextFunction) => {
    try {
        const courses = readData(COURSE_FILE);
        const newCourse = { id: courses.length + 1, ...req.body };
        courses.push(newCourse);
        writeData(COURSE_FILE, courses);
    
        logger.info('Created new course', { courseId: newCourse.id });
        res.status(201).json(newCourse);
      } catch (error) {
        logger.error('Failed to create course', { error });
        next(error);
      }
  };


  export const updateCourse = (req: Request, res: Response, next: NextFunction) => {
    try {
        const courses = readData(COURSE_FILE);
        const index = courses.findIndex((c: any) => c.id === parseInt(req.params.id));
    
        if (index === -1) {
          throw new MyError('Course not found', 404);
        }
    
        courses[index] = { ...courses[index], ...req.body };
        writeData(COURSE_FILE, courses);
    
        logger.info(`Updated course with ID ${req.params.id}`, { courseId: req.params.id });
        res.status(200).json(courses[index]);
      } catch (error) {
        logger.error(`Failed to update course with ID ${req.params.id}`, { error });
        next(error);
      }
  };

export const deleteCourse = (req: Request, res: Response, next: NextFunction) => {
    try {
        const courses = readData(COURSE_FILE);
        const index = courses.findIndex((c: any) => c.id === parseInt(req.params.id));
    
        if (index === -1) {
          throw new MyError('Course not found', 404);
        }
    
        const deletedCourse = courses.splice(index, 1)[0];
        writeData(COURSE_FILE, courses);
    
        logger.info(`Deleted course with ID ${req.params.id}`, { courseId: req.params.id });
        res.status(200).json(deletedCourse);
      } catch (error) {
        logger.error(`Failed to delete course with ID ${req.params.id}`, { error });
        next(error);
      }
};
