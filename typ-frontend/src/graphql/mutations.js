import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;

export const CREATE_USER = gql`
  mutation createUser($username: String!, $password: String!) {
    createUser(username: $username, password: $password) {
      id
      username
    }
  }
`;

export const ADD_STATISTIC = gql`
mutation AddStatistic($user: ID!, $statisticInput: StatisticInput!) {
  addStatistic(user: $user, statisticInput: $statisticInput) {
    id
    date
    grossWpm
    netWpm
    accuracy
    time
    right
    wrong
    extra
    missing
  }
}
`;