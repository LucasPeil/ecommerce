const productSchema = buildSchema(`
    type Product{
      id: ID
      images: String
      description: String
      price: Float
      available: Boolean
      quantity: Int
      comments: [String]
    }
  
    type ProductEdge {
        node: Product!      
        cursor: String!      
    }

    type PageInfo {
        hasNextPage: Boolean!   
        hasPreviousPage: Boolean! 
        startCursor: String      
        endCursor: String        
    }

       type ProductConnection {
        edges: [ProductEdge!]!   
        pageInfo: PageInfo!      
    }

       type Query {
      getProduct(id: String!): ProductResult
      getAllProducts(first: Int, after: String, search: String, checkbox: [String]): ProductConnection
      }

  
    
    input ProductInput{
      images: String
      description: String
      price: Float
      available: Boolean
      quantity: Int
    }
  
       type ProductResult {
      status: Int!
      message: String
      data: Product
      dataList: [Product]
  }
    
  
      type Mutation{
      deleteProduct(id: String!): ID
      createProduct(product: ProductInput): ProductResult
      updateProduct(id:ID!, product: ProductInput): ProductResult}
    `);
