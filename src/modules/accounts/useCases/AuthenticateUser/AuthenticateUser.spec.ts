import { AppError } from "@shared/errors/AppError";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "@modules/accounts/useCases/CreateUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let authenticateUsersUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate User", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    authenticateUsersUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory);
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it("Should be able to authenticate an user", async () => {
    const user: ICreateUserDTO = {
      name: "User Test",
      password: "1234",
      email: "user@test.com",
      driver_license: "000123",
    }

    await createUserUseCase.execute(user);

    const result = await authenticateUsersUseCase.execute({
      email: user.email,
      password: user.password
    })

    expect(result).toHaveProperty("token");
  });

  it("Should not be able to authenticate a nonexisting user", async () => {
    await expect(
      authenticateUsersUseCase.execute({
        email: "false@email.com",
        password: "1234"
      })
    ).rejects.toEqual(new AppError("Email or Password incorrect"));
  })

  it("Should not be able to authenticate with incorrect password", async () => {
    const user: ICreateUserDTO = {
      name: "User Test 2",
      password: "1234",
      email: "user@test2.com",
      driver_license: "000234",
    }

    await createUserUseCase.execute(user);

    await expect(
      authenticateUsersUseCase.execute({
        email: user.email,
        password: "incorrectPassword"
      })
    ).rejects.toEqual(new AppError("Email or Password incorrect"))
  })
});