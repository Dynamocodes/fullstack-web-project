import { gql } from '@apollo/client';

export const ME_QUERY = gql`
query Me {
  me {
    id
    username
  }
}
`;

export const ALL_STATISTICS = gql`
  query allStatistics($userId: ID!) {
    allStatistics(userId: $userId) {
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