import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      'mongodb+srv://'
    )
    console.log(`Connected to MONGO_URI`, `${conn.connection.host}`)
    console.log(`Welcome! to the Southern Indica Server!`)
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
}

export default connectDB
