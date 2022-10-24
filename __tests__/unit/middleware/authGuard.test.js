const authGuard = require('../../../src/middleware/authGuard');
const { validateToken } = require('../../../src/utils/jwt');
jest.mock('../../../src/utils/jwt');

describe('authentication guard middleware', () => {
  it('should return 401 if authorization header is missing', () => {
    // setup
    const req = {
      header: jest.fn(),
    };
    // const mockedRes = {
    //   json: jest.fn(),
    // };
    // const res = {
    //   status: jest.fn().mockReturnValue(mockedRes),
    // };
    const res = {
      status: jest.fn(),
      json: jest.fn(),
    };
    res.status.mockReturnValue(res);
    const next = jest.fn();

    // execute
    authGuard(req, res, next);

    // compare
    expect(req.header).toHaveBeenCalledWith('Authorization');
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      error: 'missing authorization header',
    });
  });

  it('should call next when token is valid', () => {
    const token = 'xxxxxx';
    const payload = {};
    const req = { header: jest.fn().mockReturnValue(`Bearer ${token}`) };
    const res = {
      status: jest.fn(),
      json: jest.fn(),
    };
    res.status.mockReturnValue(res);
    const next = jest.fn();
    validateToken.mockImplementation((token) => {
      return payload;
    });

    authGuard(req, res, next);

    expect(validateToken).toHaveBeenCalledWith(token);
    expect(next).toHaveBeenCalled();
    expect(req.user).toEqual(payload);
  });
});
