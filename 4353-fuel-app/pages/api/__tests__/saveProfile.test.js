import handler from "../saveProfile";

describe("saveProfile API", () => {
  let req;
  let res;

  beforeEach(() => {
    req = {
      method: "POST",
      query: {
        id: "1",
        fullName: "Tony Stark",
        address1: "10880 Malibu Point",
        address2: "",
        city: "Malibu",
        state: "CA",
        zipcode: "90265",
      },
    };
    res = {
      status: jest.fn(() => res),
      end: jest.fn(),
      json: jest.fn(),
    };
  });

  it("Should return 405 if method is not POST", async () => {
    req.method = "GET";
    const response = await handler(req, res);
    expect(res.status).toBeCalledWith(405);
  });

  describe("Form validation", () => {
    it("Should return 400 if id is invalid/undefined", async () => {
      req.query.id = undefined;
      const response = await handler(req, res);
      expect(res.status).toBeCalledWith(400);
      expect(res.json).toHaveBeenCalled();
    });

    describe("Name Input validation", () => {
      it("Should return 400 if Name is undefined", async () => {
        req.query.fullName = undefined;
        const response = await handler(req, res);
        expect(res.status).toBeCalledWith(400);
        expect(res.json).toBeCalledWith({
          message: "Server Recieved Invalid Name.",
        });
      });

      it("Should return 400 if Name is empty string", async () => {
        req.query.fullName = "";
        const response = await handler(req, res);
        expect(res.status).toBeCalledWith(400);
        expect(res.json).toBeCalledWith({
          message: "Server Recieved Invalid Name.",
        });
      });

      it("Should return 400 if Name contains only white space", async () => {
        req.query.fullName = "  ";
        const response = await handler(req, res);
        expect(res.status).toBeCalledWith(400);
        expect(res.json).toBeCalledWith({
          message: "Server Recieved Invalid Name.",
        });
      });

      it("Should return 400 if Name contains &", async () => {
        req.query.fullName = "john&smith";
        const response = await handler(req, res);
        expect(res.status).toBeCalledWith(400);
        expect(res.json).toBeCalledWith({
          message: "Server Recieved Invalid Name.",
        });
      });

      it("Should return 400 if Name contains /", async () => {
        req.query.fullName = "john/";
        const response = await handler(req, res);
        expect(res.status).toBeCalledWith(400);
        expect(res.json).toBeCalledWith({
          message: "Server Recieved Invalid Name.",
        });
      });

      it("Should return 400 if Name contains \\", async () => {
        req.query.fullName = "john\\";
        const response = await handler(req, res);
        expect(res.status).toBeCalledWith(400);
        expect(res.json).toBeCalledWith({
          message: "Server Recieved Invalid Name.",
        });
      });

      it("Should not return error if Name contains one name", async () => {
        req.query.fullName = "john";
        const response = await handler(req, res);
        expect(res.status).toBeCalledWith(200);
        expect(res.json).toBeCalledWith({
          message: "Profile saved to DB",
        });
      });
    });

    describe("City Input validation", () => {
      it("Should return 400 if City is undefined", async () => {
        req.query.fullName = "Tony";
        req.query.city = undefined;
        const response = await handler(req, res);
        expect(res.status).toBeCalledWith(400);
        expect(res.json).toBeCalledWith({
          message: "Server Recieved Invalid City.",
        });
      });

      it("Should return 400 if City is empty string", async () => {
        req.query.fullName = "Tony";
        req.query.city = "";
        const response = await handler(req, res);
        expect(res.status).toBeCalledWith(400);
        expect(res.json).toBeCalledWith({
          message: "Server Recieved Invalid City.",
        });
      });

      it("Should return 400 if City contains only white space", async () => {
        req.query.fullName = "Tony";
        req.query.city = "  ";
        const response = await handler(req, res);
        expect(res.status).toBeCalledWith(400);
        expect(res.json).toBeCalledWith({
          message: "Server Recieved Invalid City.",
        });
      });

      it("Should return 400 if City contains &", async () => {
        req.query.fullName = "Tony";
        req.query.city = "city&name";
        const response = await handler(req, res);
        expect(res.status).toBeCalledWith(400);
        expect(res.json).toBeCalledWith({
          message: "Server Recieved Invalid City.",
        });
      });

      it("Should return 400 if City contains /", async () => {
        req.query.fullName = "Tony";
        req.query.city = "houston/";
        const response = await handler(req, res);
        expect(res.status).toBeCalledWith(400);
        expect(res.json).toBeCalledWith({
          message: "Server Recieved Invalid City.",
        });
      });

      it("Should return 400 if City contains \\", async () => {
        req.query.fullName = "Tony";
        req.query.city = "houston\\";
        const response = await handler(req, res);
        expect(res.status).toBeCalledWith(400);
        expect(res.json).toBeCalledWith({
          message: "Server Recieved Invalid City.",
        });
      });
      it("Should return not return error if name contains a period", async () => {
        req.query.fullName = "Tony";
        req.query.city = "St. Louis";
        const response = await handler(req, res);
        expect(res.status).toBeCalledWith(400);
        expect(res.json).toBeCalledWith({
          message: "Server Recieved Invalid City.",
        });
      });
    });

    describe("State Input validation", () => {
      it("Should return 400 if State is undefined", async () => {
        req.query.fullName = "Tony";
        req.query.state = undefined;
        const response = await handler(req, res);
        expect(res.status).toBeCalledWith(400);
        expect(res.json).toBeCalledWith({
          message: "Server Recieved Invalid State.",
        });
      });

      it("Should return 400 if State is empty string", async () => {
        req.query.fullName = "Tony";
        req.query.state = "";
        const response = await handler(req, res);
        expect(res.status).toBeCalledWith(400);
        expect(res.json).toBeCalledWith({
          message: "Server Recieved Invalid State.",
        });
      });

      it("Should return 400 if State contains only white space", async () => {
        req.query.fullName = "Tony";
        req.query.state = "  ";
        const response = await handler(req, res);
        expect(res.status).toBeCalledWith(400);
        expect(res.json).toBeCalledWith({
          message: "Server Recieved Invalid State.",
        });
      });

      it("Should return 400 if State contains &", async () => {
        req.query.fullName = "Tony";
        req.query.state = "t&";
        const response = await handler(req, res);
        expect(res.status).toBeCalledWith(400);
        expect(res.json).toBeCalledWith({
          message: "Server Recieved Invalid State.",
        });
      });

      it("Should return 400 if State contains /", async () => {
        req.query.fullName = "Tony";
        req.query.state = "t/";
        const response = await handler(req, res);
        expect(res.status).toBeCalledWith(400);
        expect(res.json).toBeCalledWith({
          message: "Server Recieved Invalid State.",
        });
      });

      it("Should return 400 if State contains \\", async () => {
        req.query.fullName = "Tony";
        req.query.state = "t\\";
        const response = await handler(req, res);
        expect(res.status).toBeCalledWith(400);
        expect(res.json).toBeCalledWith({
          message: "Server Recieved Invalid State.",
        });
      });

      it("Should return not return error by default", async () => {
        req.query.fullName = "Tony";
        // req.query.state = "CA";
        const response = await handler(req, res);
        expect(res.status).toBeCalledWith(200);
        expect(res.json).toBeCalledWith({ message: "Profile saved to DB" });
      });
    });

    describe("Zipcode Input validation", () => {
      it("Should return 400 if Zipcode is undefined", async () => {
        req.query.fullName = "Tony";
        req.query.zipcode = undefined;
        const response = await handler(req, res);
        expect(res.status).toBeCalledWith(400);
        expect(res.json).toBeCalledWith({
          message: "Server Recieved Invalid Zipcode.",
        });
      });

      it("Should return 400 if Zipcode is empty string", async () => {
        req.query.fullName = "Tony";
        req.query.zipcode = "";
        const response = await handler(req, res);
        expect(res.status).toBeCalledWith(400);
        expect(res.json).toBeCalledWith({
          message: "Server Recieved Invalid Zipcode.",
        });
      });

      it("Should return 400 if Zipcode contains only white space", async () => {
        req.query.fullName = "Tony";
        req.query.zipcode = "  ";
        const response = await handler(req, res);
        expect(res.status).toBeCalledWith(400);
        expect(res.json).toBeCalledWith({
          message: "Server Recieved Invalid Zipcode.",
        });
      });

      it("Should return 400 if Zipcode contains &", async () => {
        req.query.fullName = "Tony";
        req.query.zipcode = "zipcode&name";
        const response = await handler(req, res);
        expect(res.status).toBeCalledWith(400);
        expect(res.json).toBeCalledWith({
          message: "Server Recieved Invalid Zipcode.",
        });
      });

      it("Should return 400 if Zipcode contains /", async () => {
        req.query.fullName = "Tony";
        req.query.zipcode = "houston/";
        const response = await handler(req, res);
        expect(res.status).toBeCalledWith(400);
        expect(res.json).toBeCalledWith({
          message: "Server Recieved Invalid Zipcode.",
        });
      });

      it("Should return 400 if Zipcode contains \\", async () => {
        req.query.fullName = "Tony";
        req.query.zipcode = "houston\\";
        const response = await handler(req, res);
        expect(res.status).toBeCalledWith(400);
        expect(res.json).toBeCalledWith({
          message: "Server Recieved Invalid Zipcode.",
        });
      });
      it("Should return not return error if name contains a period", async () => {
        req.query.fullName = "Tony";
        req.query.zipcode = "St. Louis";
        const response = await handler(req, res);
        expect(res.status).toBeCalledWith(400);
        expect(res.json).toBeCalledWith({
          message: "Server Recieved Invalid Zipcode.",
        });
      });
    });
  });

  //   it("Should return 400 if username is undefined", async () => {
  //     req.query.username = undefined;
  //     const response = await handler(req, res);
  //     expect(res.status).toBeCalledWith(400);
  //     expect(res.json).toBeCalledWith({
  //       message: "Username or Password not defined",
  //     });
  //   });

  //   it("Should return 400 if password is undefined", async () => {
  //     req.query.password = undefined;
  //     const response = await handler(req, res);
  //     expect(res.status).toBeCalledWith(400);
  //     expect(res.json).toBeCalledWith({
  //       message: "Username or Password not defined",
  //     });
  //   });

  //   it("Should return 200 and message if account is created", async () => {
  //     req.query.username = "JohnSmithUniqueNameForTesting";
  //     const response = await handler(req, res);
  //     expect(res.status).toBeCalledWith(200);
  //     expect(res.json).toBeCalledWith({ message: "Account Created!" });
  //   });
});
