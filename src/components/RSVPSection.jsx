import React from "react";

const RSVPSection = ({
  ref7,
  inView7,
  posts,
  post,
  setPost,
  createPost,
  attending,
  notAttending,
  bgImage,
}) => {
  const { quantity, name, presence, address } = post;
  return (
    <div
      ref={ref7} // Gunakan ref7 untuk memantau container
      className="flex justify-center items-center min-h-screen"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div
        className={`p-6 rounded-lg shadow-lg max-w-md w-full text-center border border-gray-300 ${
          inView7 ? "animate-fade-in-up" : "opacity-0"
        }`}
      >
        {/* Judul */}
        <h2
          className={`text-2xl md:text-4xl font-serif font-bold mb-4 text-gray-700 ${
            inView7 ? "animate-fade-in-up delay-100" : "opacity-0"
          }`}
        >
          Wishes
        </h2>
        <p
          className={`text-gray-600 ${
            inView7 ? "animate-fade-in-up delay-200" : "opacity-0"
          }`}
        >
          Berikan ucapan harapan dan doa kepada kedua mempelai
        </p>

        {/* Statistik Hadir/Tidak Hadir */}
        <div
          className={`flex justify-center gap-4 my-4 ${
            inView7 ? "animate-fade-in-up delay-300" : "opacity-0"
          }`}
        >
          <div className="bg-green-300 px-4 py-2 rounded text-white font-semibold">
            ✅ {attending} Hadir
          </div>
          <div className="bg-red-300 px-4 py-2 rounded text-white font-semibold">
            ❌ {notAttending} Tidak Hadir
          </div>
        </div>

        {/* Formulir */}
        <form className="space-y-3">
          <input
            type="text"
            placeholder="Nama"
            value={name}
            onChange={(e) => setPost({ ...post, name: e.target.value })}
            className={`w-full px-3 py-2 border rounded-md bg-white ${
              inView7 ? "animate-fade-in-up delay-400" : "opacity-0"
            }`}
          />
          <input
            type="text"
            placeholder="Pesan"
            value={address}
            onChange={(e) => setPost({ ...post, address: e.target.value })}
            className={`w-full px-3 py-2 border rounded-md bg-white ${
              inView7 ? "animate-fade-in-up delay-600" : "opacity-0"
            }`}
          />
          {/* Tombol Hadir/Tidak Hadir */}
          <div
            className={`flex gap-2 ${
              inView7 ? "animate-fade-in-up delay-700" : "opacity-0"
            }`}
          >
            <button
              type="button"
              onClick={() => setPost({ ...post, presence: true })}
              className={`flex-1 py-2 rounded-md font-semibold ${
                presence === true
                  ? "bg-green-500 text-white"
                  : "bg-green-200 text-green-700"
              }`}
            >
              Hadir
            </button>
            <button
              type="button"
              onClick={() => setPost({ ...post, presence: false })}
              className={`flex-1 py-2 rounded-md font-semibold ${
                presence === false
                  ? "bg-red-500 text-white"
                  : "bg-red-200 text-red-700"
              }`}
            >
              Tidak Hadir
            </button>
          </div>
          {presence && (
            <input
              type="number"
              placeholder="Jumlah Tamu"
              value={quantity}
              onChange={(e) => setPost({ ...post, quantity: e.target.value })}
              className={`w-full px-3 py-2 border rounded-md bg-white ${
                inView7 ? "animate-fade-in-up delay-500" : "opacity-0"
              }`}
            />
          )}
          {/* Tombol Kirim */}
          <button
            type="submit"
            className={`w-full bg-yellow-500 py-2 rounded-md font-semibold text-white ${
              inView7 ? "animate-fade-in-up delay-800" : "opacity-0"
            }`}
            onClick={createPost}
          >
            Kirim
          </button>
        </form>

        {/* Daftar Komentar */}
        <div
          className={`mt-6 text-left ${
            inView7 ? "animate-fade-in-up delay-900" : "opacity-0"
          }`}
        >
          <h3 className="font-semibold mb-2 text-gray-700">Komentar:</h3>
          <div className="max-h-80 overflow-y-auto space-y-2">
            {posts.map((post) => (
              <div
                className="bg-white p-3 rounded-lg shadow border border-gray-300"
                key={post.id}
              >
                <p className="font-semibold text-gray-700">
                  {post.name} {post.presence ? "✅" : "❌"}
                </p>
                <p className="text-gray-600">{post.address}</p>
                <p className="text-gray-500 text-sm">
                  {new Date(post.time).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RSVPSection;
