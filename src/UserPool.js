import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: "ap-northeast-1_NEAykxHnH11",
  ClientId: "2ksnme0urplhjq8r4tc7qo2pja11",
};

export default new CognitoUserPool(poolData);
