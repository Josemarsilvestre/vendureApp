import { graphql } from "../../gql";

interface LoginData {
  login: {
    __typename: "CurrentUser";
    id: string;
    identifier: string;
    channels: {
      token: string;
    }[];
  } | {
    __typename: "InvalidCredentialsError";
    errorCode: string;
    message: string;
  };
}

interface RegisterData {
  registerCustomerAccount: {
    __typename: "Success";
    success: boolean;
  } | {
    __typename: "MissingPasswordError";
    errorCode: string;
    message: string;
  } | {
    __typename: "PasswordValidationError";
    errorCode: string;
    message: string;
    validationErrorMessage: string;
  } | {
    __typename: "NativeAuthStrategyError";
    errorCode: string;
    message: string;
  };
}

interface VerifyData {
  verifyCustomerAccount: 
    | {
      __typename: "CurrentUser";
      id: string;
      identifier: string;
      channels: {
        token: string;
      }[];
    }
    | {
      __typename: "VerificationTokenInvalidError" | "VerificationTokenExpiredError" | "MissingPasswordError" | "PasswordValidationError" | "PasswordAlreadySetError" | "NativeAuthStrategyError";
      errorCode: string;
      message: string;
    };
}


export const LOGIN_MUTATION = graphql(`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ... on CurrentUser {
        id
        identifier
        channels {
          token
        }
      }
      ... on InvalidCredentialsError {
        errorCode
        message
      }
      ... on NativeAuthStrategyError {
        errorCode
        message
      }
      ... on ErrorResult {
        errorCode
        message
      }
    }
  }
`);

export const REGISTER_MUTATION = graphql(`
  mutation Register(
    $emailAddress: String!
    $firstName: String!
    $lastName: String!
    $password: String!
  ) {
    registerCustomerAccount(
      input: {
        emailAddress: $emailAddress
        firstName: $firstName
        lastName: $lastName
        password: $password
      }
    ) {
      ... on Success {
        success
      }
      ... on MissingPasswordError {
        errorCode
        message
      }
      ... on PasswordValidationError {
        errorCode
        message
        validationErrorMessage
      }
      ... on NativeAuthStrategyError {
        errorCode
        message
      }
    }
  }
`);

export const VERIFY_CUSTOMER = graphql(`
mutation VerifyCustomer($token: String!, $password: String) {
  verifyCustomerAccount(token: $token, password: $password) {
    ... on CurrentUser {
      id
      identifier
      channels {
        token
      }
    }
    ... on VerificationTokenInvalidError {
      errorCode
      message
    }
    ... on VerificationTokenExpiredError {
      errorCode
      message
    }
    ... on MissingPasswordError {
      errorCode
      message
    }
    ... on PasswordValidationError {
      errorCode
      message
    }
    ... on PasswordAlreadySetError {
      errorCode
      message
    }
    ... on NativeAuthStrategyError {
      errorCode
      message
    }
  }
}
`);
