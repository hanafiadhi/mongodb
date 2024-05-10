db.createCollection("flightData");
db.dropDatabase();

db.flightData.find().pretty();

db.flightData.updateOne({ distance: 12000 }, { $set: { marker: "delete" } });
db.flightData.updateMany({}, { $set: { marker: "delete" } });

db.flightData.deleteOne({ departureAirport: "MUC" });
db.flightData.deleteMany({});

db.flightData.insertOne({
  departureAirport: "MUC",
  arrivalAirport: "SFO",
  aircraft: "Airbus A380",
  distance: 12000,
  intercontinental: true,
});
db.flightData.insertMany([
  {
    departureAirport: "MUC",
    arrivalAirport: "SFO",
    aircraft: "Airbus A380",
    distance: 12000,
    intercontinental: true,
  },
  {
    departureAirport: "LHR",
    arrivalAirport: "TXL",
    aircraft: "Airbus A320",
    distance: 950,
    intercontinental: false,
  },
]);

db.flightData.find({ distance: { $gt: 1000 } }).pretty();

/**
 * passengers
 */
db.passengers.insertMany([
  {
    name: "Max Schwarzmueller",
    age: 29,
  },
  {
    name: "Manu Lorenz",
    age: 30,
  },
  {
    name: "Chris Hayton",
    age: 35,
  },
  {
    name: "Sandeep Kumar",
    age: 28,
  },
  {
    name: "Maria Jones",
    age: 30,
  },
  {
    name: "Alexandra Maier",
    age: 27,
  },
  {
    name: "Dr. Phil Evans",
    age: 47,
  },
  {
    name: "Sandra Brugge",
    age: 33,
  },
  {
    name: "Elisabeth Mayr",
    age: 29,
  },
  {
    name: "Frank Cube",
    age: 41,
  },
  {
    name: "Karandeep Alun",
    age: 48,
  },
  {
    name: "Michaela Drayer",
    age: 39,
  },
  {
    name: "Bernd Hoftstadt",
    age: 22,
  },
  {
    name: "Scott Tolib",
    age: 44,
  },
  {
    name: "Freddy Melver",
    age: 41,
  },
  {
    name: "Alexis Bohed",
    age: 35,
  },
  {
    name: "Melanie Palace",
    age: 27,
  },
  {
    name: "Armin Glutch",
    age: 35,
  },
  {
    name: "Klaus Arber",
    age: 53,
  },
  {
    name: "Albert Twostone",
    age: 68,
  },
  {
    name: "Gordon Black",
    age: 38,
  },
]);

db.passengers.find().forEach((data) => {
  printJson(data);
});

db.passengers.find({}, { name: 1 }).pretty();
db.passengers.updateOne(
  { name: "Albert Twostone" },
  {
    $set: {
      hobbies: ["drawing", "gaming", "loving self"],
    },
  }
);

/**
 * $push
 * https://www.mongodb.com/docs/manual/reference/operator/update/push/
 */
db.passengers.updateOne(
  { name: "Albert Twostone" },
  {
    $push: {
      history: {
        $each: [
          { disease: "flu", treatment: 1, pengisi: "hanafi" },
          { disease: "fever", treatment: 2, pengisi: "hanafi" },
          { disease: "cold", treatment: 3, pengisi: "hanafi" },
        ],
      },
    },
  }
);

db.companies.insertOne({
  name: "Fresh Apple Inc",
  isStartup: true,
  employees: 33,
  funding: 12345678901234567890,
  details: { ceo: "Hanafi Adhi" },
  tags: [{ title: "super" }, { title: "perfect" }],
  foundingDate: new Date(),
  insertedAt: new Timestamp(),
});

/**
 *
 * one two one embeded
 */
db.patients.insertOne({
  name: "Max",
  age: 20,
  diseaseSummary: { diseases: ["cold", "broken heart"] },
});

/**
 *
 *  one to one reference
 *  setelah membuat person lalu membuat data car dengan meyisipkan filed owner dengan value _id (person)
 */
db.persons.insertOne({ name: "hanafi", age: 24 });
db.cars.insertOne({
  model: "BMW",
  price: NumberInt(20),
  owner: ObjectId("123"),
});

/**
 *
 * one to many embed
 *
 */
db.questionThreads.insertOne({
  creator: "Hanafi",
  question: "How to thats work?",
  answers: [
    {
      text: "bismillah",
    },
    {
      text: "Allohu akbar",
    },
  ],
});

/**
 *
 * one to many reference
 * setelah membuat cities ambil _idnya
 * masukan _id cities ke field citiesId dengan collection citizens
 *
 */
db.cities.insertOne({
  name: "Jakarta",
  coordinate: {
    latitude: 1233188,
    longtitude: 1908932131,
  },
});

db.citizens.insertMany(
  {
    name: "Max Schwarzmueller",
    age: 29,
    citiesId: ObjectId("citiesId"),
  },
  {
    name: "Manu Lorenz",
    age: 30,
    citiesId: ObjectId("citiesId"),
  },
  {
    name: "Chris Hayton",
    age: 35,
    citiesId: ObjectId("citiesId"),
  },
  {
    name: "Sandeep Kumar",
    age: 28,
    citiesId: ObjectId("citiesId"),
  }
);

/**
 *
 * Many to Many embeded
 *
 */
db.products.insertOne({
  name: "The Lord Of The Rings",
  price: NumberLong(2000000),
});

db.customers.insertOne({
  name: "Hanafi",
  age: NumberInt(12),
  orders: [{ name: "The Lord Of The Rings", price: NumberLong(2000000) }],
});

/**
 *
 * many to many reference
 * create author save _id
 * then insert in book
 *
 */
db.authors.insertOne({
  name: "Hanafi",
  age: NumberInt(12),
  address: {
    street: "jawa",
  },
});
//_id : 663855c2783b9151b3d84d95

db.authors.insertOne({
  name: "Adhi",
  age: NumberInt(12),
  address: {
    street: "jawa",
  },
});
db.books.insertOne({
  name: "Nothing Last Forever we can change the future",
  price: NumberLong(178930),
  author: [ObjectId("663855c2783b9151b3d84d95")],
});

/**
 * Read
 * from -> dari collection name (ex:authors)
 * localField -> field mana yang berelasi dengan collection (ex:author ->_id)
 * foreignField -> field yang berelasi dari book ke auhtor
 * as -> field yang nantinya akan di jadikan untuk menyimpan datanya
 */
db.books
  .aggregate([
    {
      $lookup: {
        from: "authors",
        localField: "author",
        foreignField: "_id",
        as: "author_details",
      },
    },
  ])
  .pretty();
/**
 * result
 * {
        "_id" : ObjectId("663855d2783b9151b3d84d96"),
        "name" : "Nothing Last Forever we can change the future",
        "price" : NumberLong(178930),
        "author" : [
                ObjectId("663855c2783b9151b3d84d95")
        ],
        "author_details" : [
                {
                        "_id" : ObjectId("663855c2783b9151b3d84d95"),
                        "name" : "Hanafi",
                        "age" : 12,
                        "address" : {
                                "street" : "jawa"
                        }
                }
        ]
}
 */

/**
 * Validation Schema
 * https://www.mongodb.com/docs/manual/core/schema-validation/
 *
 */
db.createCollection("posts", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["title", "text", "creator", "comments"],
      properties: {
        title: {
          bsonType: "string",
          description: "must be a string and is required",
        },
        text: {
          bsonType: "string",
          description: "must be a string and is required",
        },
        creator: {
          bsonType: "objectId",
          description: "must be an objectid and is required",
        },
        comments: {
          bsonType: "array",
          description: "must be an array and is required",
          items: {
            bsonType: "object",
            required: ["text", "author"],
            properties: {
              text: {
                bsonType: "string",
                description: "must be a string and is required",
              },
              author: {
                bsonType: "objectId",
                description: "must be an objectid and is required",
              },
            },
          },
        },
      },
    },
  },
});

db.posts.insertOne({
  title: "First Post",
  text: "Halo semua ini adalah post pertama kali saya",
  tag: ["new", "tech"],
  creator: ObjectId("66385cf8783b9151b3d84d97"),
  comments: [
    {
      text: "Hai",
      author: ObjectId("663855c2783b9151b3d84d95"),
    },
  ],
});

/**
 * jika sudah mempunyai collectionya
 * tapi belum pernah memiliki validasi
 */
db.runCommand({
  collMod: "posts",
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["title", "text", "creator", "comments"],
      properties: {
        title: {
          bsonType: "string",
          description: "must be a string and is required",
        },
        text: {
          bsonType: "string",
          description: "must be a string and is required",
        },
        creator: {
          bsonType: "objectId",
          description: "must be an objectid and is required",
        },
        comments: {
          bsonType: "array",
          description: "must be an array and is required",
          items: {
            bsonType: "object",
            required: ["text", "author"],
            properties: {
              text: {
                bsonType: "string",
                description: "must be a string and is required",
              },
              author: {
                bsonType: "objectId",
                description: "must be an objectid and is required",
              },
            },
          },
        },
      },
    },
  },
  validationAction: "warn",
});

/**
 * Todo
 * learn import
 * mongoimport tv-shows.json -d movieData -c movie --jsonArray --drop
 * tv-shows.json -> file nama jsonya
 * -d -> nama database
 * -c -> nama collectionya
 * --jsonArray -> menggunakan ini karena isinya array object
 * --drop -> jika movieData.movie datanya ada maka akan di hapus
 *           dan akan di timpa dengan yang baru
 */

/**
 * Read Operations
 * Operator
 */

db.movies.find({ runtime: 60 });
db.movies.find({ runtime: { $eq: 60 } }); //sama dengan equal

db.movies.find({ runtime: { $ne: 60 } }); // tidak sama dengan

db.movies.find({ runtime: { $lt: 60 } }); // dibawah dari value filter
db.movies.find({ runtime: { $lte: 60 } }); // dibawah sama dengan value filter

db.movies.find({ runtime: { $gt: 60 } }); // lebih dari value

/**
 * Read Operations
 * Embeded field
 */

db.movies.find({ "rating.average": { $gt: 6.5 } });

/**
 * Read Operations
 * Array
 */
db.movies.find({ runtime: { $in: [30, 42] } }); //mencari data yang mempunyai nilai dengan 30 atau 42
db.movies.find({ runtime: { $nin: [30, 42] } }); //mencari data yang tidak mempunyai nilai dengan 30 atau 42

/**
 * Read Operations
 * OR
 */
db.movies.find({
  $or: [{ "rating.average": { $lt: 5 }, "rating.average": { $gt: 9.3 } }],
}); //mencari 2 filter yang cocok
db.movies.find(
  {
    $nor: [{ "rating.average": { $lt: 5 }, "rating.average": { $gt: 9.3 } }],
  },
  { "rating.average": 1 }
); //mencari 2 filter yang tidak cocok

/**
 * Read Operations
 * And
 */
// Step 1
db.movies.find(
  {
    $and: [{ "rating.average": { $gt: 9.3 } }, { genres: "Drama" }],
  },
  { genres: 1 }
);
db.movies.find(
  { "rating.average": { $gt: 9.3 }, genres: "Drama" },
  { genres: 1, "rating.average": 1 }
);

//code ini sama dengan yang di atas sama dengan and tetapi
// jika filednya sama maka akan mengambil field terakhir
// ex:
db.movies.find({ genres: "Drama", genres: "Horror" });
// Best Practicenya
db.movies.find({ $and: [{ genres: "Drama", genres: "Horror" }] }).count();

/**
 * Mencari data user yang mempunyai field age (exists)
 * dan nilainya tidak boleh null
 */
db.users.find({ age: { $exists: false, $ne: null } });

/**
 * mencari data user yang type phonenya itu double dan string
 */
db.users.find({ phone: { $type: ["double", "string"] } });

/**
 * bikin collection sales
 */
db.sales.insertMany([
  {
    volume: 100,
    target: 120,
  },
  {
    volume: 89,
    target: 80,
  },
  {
    volume: 200,
    target: 177,
  },
]);

/**
 *
 * Evaluation Query Operators
 * https://www.mongodb.com/docs/manual/reference/operator/query/regex/
 * fungsi $ pada volume dan target artinya mengambil valuenya contoh 200 & 177
 * https://www.mongodb.com/docs/manual/reference/operator/query/expr/#mongodb-query-op.-expr
 */
db.sales.find({
  $exprs: { $gt: ["$volume", "$target"] },
});

/**
 * Read Operations
 * ArrayObject
 * $size
 */
db.user.insertMany([
  {
    name: "hanafi",
    hobbies: [
      {
        title: "sport",
        frequency: 10,
      },
    ],
    age: 50,
  },
  {
    name: "Dede",
    hobbies: [
      {
        title: "Hiking",
        frequency: 10,
      },
    ],
    age: 50,
  },
]);

db.user.find({ hobbies: { $size: 2 } }); //untuk menghitung total data di hobbies

/**
 * Read Operations
 * $elemMatch
 * array Object / array biasa
 */

db.users.find({
  $and: [{ "hobbies.title": "sport" }, { "hobbies.frequency": { $gte: 3 } }],
});
/**
 * query tidak bisa digunakan karena memang tidak bisa di gunakan karena
 * query tersebut akan mencari  hobbies.title dan obbies.frequency jadi 2 query
 * bukan menjadi 1 query
 *
 */

db.users.find({
  hobbies: { $elemMatch: { title: "sport", frequency: { $gte: 3 } } },
});
/**
 * query akan mencari hobbies yang mempunyai title dan frequency
 */
db.xxxx.find({ ratings: { $elemMatch: { $gt: 8, $lt: 10 } } });

/**
 * Update Deep
 * $unset
 * digunakan untuk menghapus field
 */
db.users.updateMany({ isSporty: true }, { $unset: { phone: "" } });

/**
 * Update Deep
 * $unset
 * digunakan untuk rename field
 */
db.users.updateMany({}, { $renamae: { age: "totalAge" } });

/**
 * Update Deep
 *  query tersbut akan mencari hobbies dengan filter tentu lalu
 * jika ketemu kmaka pada field hobbies tersebut
 * symbol $ menandakan akan mengubah data di object / data saat ini
 * disini di tambahkan field highFrequency dengan nilai 10
 *
 */
{
  hobbies: [
    { title: "sport", frequency: 3, highFrequency: 10 },
    { title: "tani", frequency: 34 },
  ]; // before
}
{
  hobbies: [
    { title: "sport", frequency: 3 },
    { title: "tani", frequency: 34 },
  ]; // after
}

db.user.updateMany(
  {
    hobbies: { $elemMatch: { title: "sport", frequency: { $gte: 3 } } },
  },
  {
    $set: {
      "hobbies.$.highFrequency": 10,
    },
  }
);

/**
 * Update Deep
 * query tersbut akan mengupdate each data hobbies.frequency di kurangi
 *
 */

db.user.updateMany(
  {
    age: { $gt: 30 },
  },
  { $inc: { "hobbies.$[].frequency": -1 } }
);

{
  hobbies: [
    { title: "sport", frequency: 3, highFrequency: 10 },
    { title: "tani", frequency: 34 },
  ]; // before
}
{
  hobbies: [
    { title: "sport", frequency: 2 },
    { title: "tani", frequency: 33 },
  ]; // after
}
/**
 * Update Deep
 * Array Filter
 *
 */

/**
 * Update Deep
 * $push digunakan untuk menambahkan data ke array object
 * dan bisa di combine dengan $sort untuk mengsortir
 * array Object Sesuai dengan keinginan
 * ex: $sort frequency by decs
 *
 */
db.user.updateOne(
  { name: "hanafi" },
  { $push: { hobbies: { title: "hiking", frequency: 2 } } }
);

db.user.updateOne(
  { name: "hanafi" },
  {
    $push: {
      history: {
        $each: [
          { disease: "flu", treatment: 1, pengisi: "hanafi" },
          { disease: "fever", treatment: 2, pengisi: "hanafi" },
          { disease: "cold", treatment: 3, pengisi: "hanafi" },
        ],
      },
    },
  },
  {
    $sort: {
      frequency: -1,
    },
  }
);
{
  hobbies: [
    { title: "sport", frequency: 3, highFrequency: 10 },
    { title: "tani", frequency: 34 },
  ]; // before
}
{
  hobbies: [
    { title: "sport", frequency: 3, highFrequency: 10 },
    { title: "tani", frequency: 34 },
    {
      title: "hiking",
      frequency: 2,
    },
  ]; // before
}

/**
 * Update Deep
 * delete / remove elemnent form Arrays
 * $pull
 * field array Object hobbies dengan field title = "hiking akan di hapus"
 * $pop
 * menghapus element terakhir dari sebuah object
 * {$pop:{hobbies:1}} -> menghapus elemnent terakhir
 * {$pop:{hobbies:-1}} -> menghapus elemnent pertama
 */
db.user.updateOne(
  {
    name: "maria",
  },
  {
    $pull: {
      hobbies: {
        title: "hiking",
      },
    },
  }
);

/**
 * Update Deep
 * $addToSet digunakan untuk menambahkan data ke array object
 * dan jika $push bisa duplicate maka $addToSet itu tidak bisa duplicate
 *
 */
db.user.updateOne(
  { name: "maria" },
  {
    $addToSet: {
      hobbies: {
        title: "Hiking",
        frequency: 3,
      },
    },
  }
);

/** Index Start */
/**
 * explain untuk melihat detail
 */
db.person.explain().find({ "dob.age": 35 });

/**
 * Create Index
 */
db.person.createIndex({ "dob.age": 1 });

/**
 * Compound Index
 * gabungan beberapa field untuk menjadi 1 index
 */
db.person.createIndex({ "dob.age": 1, gender: 1 });

/**
 * config Index
 * set email harus unique
 */
db.person.createIndex({ email: 1 }, { unique: true });

/**
 * Partial Index
 * membuat index dengan sebagian atau kondisi tertentu
 * kita akan membuat index dob.age dan gendernya male
 * jika quary dob.age saja atau gender male saja
 * tidak akan di explain Index
 *
 * jika query dob.age dan genernya male maka akan ter explain index
 */
db.person.createIndex(
  { "dob.age": 1 },
  { partialFilterExpression: { gender: 1 } }
);

/**
 *  Apply Partial Index
 *  kita akan coba untuk membuat index email dan email tersebut harus unique
 *  akan terjadi error karena si kakuzu itu tidak mempunyai email
 *  kita bisa mengakali / tetap membuat index dengan
 *
 */
db.user.insertMany([
  {
    name: "hanafi",
    email: "hanafi@gmail.com",
  },
  {
    nama: "kakuzu",
  },
]);

db.user.createIndex(
  { email: 1 },
  { unique: true, partialFilterExpression: { email: { $exists: true } } }
);

/**
 * TTL Index
 * data apapun yang menggunakan index expireAfterSeconds
 * akan terhapus otomatis sampai waktu yang di tentukan
 *
 */
db.session.insertOne({
  data: "dahlah",
  createdAt: new Date(),
});
db.session.createIndex({ createdAt: 1 }, { expireAfterSeconds: 10 });

/**
 * Text Index
 * ketika kita akan mencari data description atau long text maka baiknya menggunakan
 * akan mencari kata yang ingin di cari
 *
 */
db.products.createIndex({ description: "text" });

/**
 * akan mencari semua kata yang mirip dengan awesome
 */
db.products.find({ $text: { $search: "awesome" } });

/**
 * akan mencari semua data yang mempuyai value red atau book
 */
db.products.find({ $text: { $search: "red book" } });

/**
 * mencari data satu kalimat  "awesome book"
 * db.products.find({ $text: { $search: "\"awesome book\"" } });
 */
db.products.find({ $text: { $search: '"awesome book"' } });

/** Index END */
-6.175259011687105, 106.82695509940623;
/** Geospatial Start */

db.places.insertOne({
  _id: ObjectId("663b2eb264544eca7304f584"),
  name: "Tugu Monas",
  location: {
    type: "Point",
    coordinates: [106.8269550994062, -6.175259011687105],
  },
});
db.places.createIndex({ location: "2dsphere" });

db.places.find({
  location: {
    $near: {
      $geometry: {
        type: "Point",
        coordinates: [106.82336093939253, -6.172165693916675],
      },
      $maxDistance: 1000,
      $minDistance: 10,
    },
  },
});
/** Geospatial End */

/** Agregation Framework */
db.person.aggregate([{ $match: { gender: "female" } }]);

/**
 * filter data sesuai gender
 * groping data by location jika ada maka akan di tambahkan
 * $location.state -> artinya untuk mengambil value saat ini ex: Kota Bekasi, Kota Cilacap
 */
db.person.aggregate([
  { $match: { gender: "female" } },
  { $group: { _id: { state: "$location.state" }, totalPerson: { $sum: 1 } } },
  { $sort: { totalPerson: -1 } },
]);

/**
 * query ini hanya ingin mengambil firt dan last dari name
 * ex hanafi adhi
 */
db.persom.aggregate([
  {
    $project: {
      _id: 0,
      gender: 1,
      fullName: { $concat: ["$name.first", " ", "$name.last"] },
    },
  },
]);

/**
 * $substr
 * https://www.mongodb.com/docs/manual/reference/operator/aggregation/substr/
 * https://www.mongodb.com/docs/manual/reference/operator/aggregation/substrCP/
 */
db.person.aggregate([
  {
    $project: {
      _id: 0,
      gender: 1,
      fullName: {
        $concat: [
          {
            $toUpper: { $substrCP: ["$name.first", 0, 1] },
          },
          {
            $substrCP: [
              "$name.first",
              1,
              { $subtract: [{ strLenCp: "$name.first" }, 1] },
            ],
          },
          " ",
          {
            $toUpper: { $substrCP: ["$name.last", 0, 1] },
          },
          {
            $substrCP: [
              "$name.last",
              1,
              { $subtract: [{ strLenCp: "$name.last" }, 1] },
            ],
          },
        ],
      },
    },
  },
]);

/**
 * Slide Presentasi
 * https://docs.google.com/presentation/d/1Yywz3bxrAaxSlPftY6f5fYKNJYSq8sZdYquvOqWyFMg/edit?usp=sharing
 */
