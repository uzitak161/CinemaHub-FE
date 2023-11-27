const mockUsersData = [
  {
    _username: "user1",
    passwordHash: "hash1",
    role: "USER",
    friends: ["admin1"],
    likedMovies: [101, 102],
    comments: [201, 202],
    createdAt: new Date('2023-01-01'),
    email: "user1@example.com"
  },
  {
    _username: "admin1",
    passwordHash: "hash2",
    role: "ADMIN",
    friends: ["user1", "user2"],
    likedMovies: [103],
    comments: [203],
    createdAt: new Date('2023-01-02'),
    email: "admin1@example.com"
  },
  {
    _username: "himothy",
    passwordHash: "hash4#",
    role: "ADMIN",
    friends: [],
    likedMovies: [103],
    comments: [203],
    createdAt: new Date('2023-01-02'),
    email: "admin1@example.com"
  },
  {
    _username: "user2",
    passwordHash: "hash3",
    role: "USER",
    friends: ["admin1"],
    likedMovies: [101, 102],
    comments: [201, 202],
    createdAt: new Date('2023-01-01')
  }
];

export default mockUsersData;