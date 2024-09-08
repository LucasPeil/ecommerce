const productSchema = buildSchema(`
    type Product{
      id: ID
      image: String
      description: String
      price: Float
      available: Boolean
      quantity: Int
      comments: [String]
    }
  
    type ProductResult {
      status: Int!
      message: String
      data: Product
      dataList: [Product]
  }
    
    input ProductInput{
      image: String
      description: String
      price: Float
      available: Boolean
      quantity: Int
    }
  
      type Query {
      getProduct(id: String!): ProductResult
      getAllProducts(start: Int, end:Int, page:Int, search:String, checkbox: [String] ): [ProductResult]
      }
  
      type Mutation{
      deleteProduct(id: String!): ID
      createProduct(product: ProductInput): ProductResult
      updateProduct(id:ID!, product: ProductInput): ProductResult}
    `);
