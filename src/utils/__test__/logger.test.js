import { createLogger, transports, format } from 'winston';
import fs from 'fs';
import path from 'path';
import { loggerRequest } from '../logger';

// Mock the current time
const mockDate = new Date('2024-09-01T12:10:10Z');
global.Date = jest.fn(() => mockDate);

describe('loggerRequest', () => {
    const errorLogPath = path.join(__dirname, '../../../error.log');
    const combinedLogPath = path.join(__dirname, '../../../combined.log');
    const exceptionsLogPath = path.join(__dirname, '../../../exceptions.log');

    let logOutput = '';
    const mockStream = {
        write: (log) => { logOutput += log; }
    };

    beforeEach(() => {
        // Clean up log files
        [errorLogPath, combinedLogPath, exceptionsLogPath].forEach(filePath => {
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        });
        logOutput = ''; // Reset log output
    });


    it('should write logs to the correct files', async () => {
        const requestId = '12345';
        const logger = loggerRequest(requestId);

        // Log messages
        logger.error('Error message');
        logger.info('Info message');

        // Wait a little to ensure files are written
        await new Promise(resolve => setTimeout(resolve, 100));

        // Check if files are created and contain the log entries
        expect(fs.existsSync(errorLogPath)).toBe(true);
        expect(fs.existsSync(combinedLogPath)).toBe(true);
        expect(fs.existsSync(exceptionsLogPath)).toBe(true);

        // Read files to check content
        const errorLogContent = fs.readFileSync(errorLogPath, 'utf-8');
        const combinedLogContent = fs.readFileSync(combinedLogPath, 'utf-8');

        expect(errorLogContent).toContain('Error message');
        expect(combinedLogContent).toContain('Info message');
    });
});
