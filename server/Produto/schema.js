const productSchema = buildSchema(`
    type Product{
      _id: ID
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
        endCursor: String        
    }

       type ProductConnection {
        edges: [ProductEdge!]!   
        pageInfo: PageInfo!      
    }

       type Query {
      getProduct(id: String!): ProductResult
      getAllProducts(first: Int, after: String, filter: FilterType, searchText: String, sort: String): ProductConnection
      }

  
    
    input ProductInput{
      images: String
      description: String
      price: Float
      available: Boolean
      quantity: Int
      category: String
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
