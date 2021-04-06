import { Request, Response } from 'express';
import { TestRepository } from '../db/repository/test';

const testRepository = new TestRepository(); 

class TestController {
  async getList(req: Request, res: any) {
    try {
      testRepository.getList(results => {
        return res.success({
          results
        });
      });
    } catch (e) {
      return res.error(new Error(e));            
    }
  }
}

export default new TestController();
