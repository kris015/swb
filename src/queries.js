import { gql } from '@apollo/client';

export const GET_CATEGORIES = gql`
  query {
    categories {
      id
      name
      __typename
    }
  }
`;

export const GET_PRODUCTS = gql`
  query Products($category: String) {
    products(category: $category) {
      id
      name
      inStock
      gallery
      description
      category
      attributes {
        id
        name
        type
        items {
          id
          displayValue
          value
          __typename
        }
        __typename
      }
      prices {
        amount
        currency {
          label
          symbol
          __typename
        }
        __typename
      }
      brand
      __typename
    }
  }
`;

export const GET_PRODUCT = gql`
  query Product($id: String!) {
    product(id: $id) {
      id
      name
      inStock
      gallery
      description
      category
      attributes {
        id
        name
        type
        items {
          id
          displayValue
          value
          __typename
        }
        __typename
      }
      prices {
        amount
        currency {
          label
          symbol
          __typename
        }
        __typename
      }
      brand
      __typename
    }
  }
`;

export const GET_CURRENCIES = gql`
  query {
    currencies {
      id
      label
      symbol
      __typename
    }
  }
`;

export const CREATE_ORDER = gql`
  mutation CreateOrder($products: [OrderProductInput!]!) {
    createOrder(products: $products) {
      id
      createdAt
    }
  }
`;