import { User } from "../src/entity/User";
import { encryptPassword } from "../src/utils";
import { TestHelper } from './TestHelpers';

beforeAll(async () => {
    await TestHelper.instance.setupTestDB();
});

afterAll(() => {
    TestHelper.instance.teardownTestDB();
});

describe('User Tests', () => {

    test('should create a new user', async () => {
        const user = new User();
        user.email = "test@gmail.com";
        user.username = "Test";
        user.password = encryptPassword("password");
        User.instance
        expect(numbersMap.phoneNumber).toBe('12345678');
        expect(numbersMap.home).toBe('test');
    });

    test('it should be able to return the home destination', async () => {
        const home = await Gateway.instance.getHomeDestination('12345678');
        expect(home).toBe('test');
    });
});


