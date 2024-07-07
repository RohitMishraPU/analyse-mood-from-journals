export default function Home() {
  return (
    <div className="w-screen h-screen bg-black flex  flex-col justify-center items-center text-white">
      <h1 className="text-6xl">Best Journal App</h1>
      <p className="text-2xl text-white/60 mb-2"> Mood analysis powered by AI</p>
      <button className=" p-2 bg-purple-400 border-purple-100 rounded-md">Get Started</button>
    </div>
  )
}
