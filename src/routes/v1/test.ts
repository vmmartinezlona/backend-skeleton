import express from 'express';
import { asyncWrapperMiddleware } from '../../middlewares';
import TestController from '../../controllers/test';

const router = express.Router();

/**
 * @api {GET} /test/list
 * @apiName Test List
 * @apiGroup Test
 * @apiVersion 0.1.0
 *
 * @apiSuccess {Object} Test List
 * 
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *    {
 *      "success": true,
 *        "data": {
 *           "results": [
 *            [
                {
                  "name": {string}, // name 
                  "id": {number} // identifier 
                }, {...}
 *           ]
 *        }
 *     }
 *
 * @apiError {Object} BadRequest It will return object containing data about the error and the success flag will be false
 *
 * @apiErrorExample Error-Response:
 *  HTTP/1.1 400 Bad Request
 *    {
 *      "success" false,
 *      "error": {
 *        "name": "BadRequest",
 *        "message": "Cannot get the list",
 *        "status": 400,
 *        "data": {} // any additional data
 *      }
 *    }
 */
router.get('/list',
  asyncWrapperMiddleware(TestController.getList)
);

export default router;
