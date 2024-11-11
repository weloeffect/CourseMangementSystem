import express from 'express';
import { 
  getAllCourses, 
  getCourseById, 
  createCourse, 
  updateCourse, 
  deleteCourse 
} from '../controllers/courseController';
import validateData from '../middleware/validateData';
import { courseSchema } from '../validation/courseValidation';

const router = express.Router();

// Define each CRUD route
/**
 * @swagger
 * /api/courses/:
 *   get:
 *     summary: Get all courses
 *     description: Retrieve a paginated list of courses.
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Maximum number of items per page
 *     responses:
 *       200:
 *         description: List of courses
 *       500:
 *         description: Server error
 */
router.get('/', getAllCourses);          // Read all courses

/**
 * @swagger
 * /api/courses/{id}:
 *   get:
 *     summary: Get a specific course 
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Course ID
 *     responses:
 *       200:
 *         description: Course details
 *       404:
 *         description: Course not found
 */

router.get('/:id', getCourseById);      // Read one course by ID

/**
 * @swagger
 * /api/courses/create:
 *   post:
 *     summary: Create a new course
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               modules:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     title:
 *                       type: string
 *                     lessons:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           title:
 *                             type: string
 *                           description:
 *                             type: string
 *                           topics:
 *                             type: array
 *                             items:
 *                               type: string
 *                           content:
 *                             type: array
 *                             items:
 *                               type: object
 *                               properties:
 *                                 type:
 *                                   type: string
 *                                 data:
 *                                   type: string
 *     responses:
 *       201:
 *         description: Course created
 *       400:
 *         description: Invalid input
 */

router.post('/create', validateData(courseSchema), createCourse);         // Create a new course

/**
 * @swagger
 * /api/courses/update/{id}:
 *   put:
 *     summary: Update a course
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               modules:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     title:
 *                       type: string
 *                     lessons:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           title:
 *                             type: string
 *                           description:
 *                             type: string
 *                           topics:
 *                             type: array
 *                             items:
 *                               type: string
 *                           content:
 *                             type: array
 *                             items:
 *                               type: object
 *                               properties:
 *                                 type:
 *                                   type: string
 *                                 data:
 *                                   type: string
 *     responses:
 *       200:
 *         description: Course updated
 *       404:
 *         description: Course not found
 */

router.put('/update/:id', validateData(courseSchema), updateCourse);       // Update an existing course by ID

/**
 * @swagger
 * /api/courses/remove/{id}:
 *   delete:
 *     summary: Delete a course
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Course deleted
 *       404:
 *         description: Course not found
 */

router.delete('/remove/:id', deleteCourse);    // Delete a course by ID

export default router;
