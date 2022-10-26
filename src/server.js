import { createServer, Model, belongsTo, Factory, Response } from "miragejs";
import faker from "faker";
import * as yup from "yup";

const prodcutSchema = yup.object().shape({
  categoryTypeId: yup.string().required(),
  description: yup.string().required(),
  id: yup.string().required(),
  parentId: yup.string(),
  img: yup.string().required(),
  label: yup.string().required(),
  price: yup.string().required(),
});

const valdiateProduct = async (prodcut) => {
  return prodcutSchema
    .validate(prodcut, { abortEarly: false })
    .then(() => [])
    .catch(({ inner }) =>
      inner.map((e) => e.message?.split(" at createError")[0] ?? e)
    );
};

createServer({
  models: {
    category: Model,
    good: Model.extend({
      categoryType: belongsTo("category"),
    }),

    cart: Model,
    account: Model,
    authUser: Model,
  },

  factories: {
    good: Factory.extend({
      label: () => faker.commerce.productName(),
      price: () => faker.commerce.price(1, 200),
      description: () => faker.commerce.productDescription(),
      img: "https://source.unsplash.com/random",
    }),
  },

  seeds(server) {
    const USERS = [
      { login: "admin", password: "123" },
      { login: "Kate", password: "12345" },
      { login: "Mark", password: "12345" },
      { login: "Pol", password: "12345" },
    ];
    
    USERS.forEach((user) => {
      server.create("account", user);
    });
    // server.create("authUser", []);

    const CATEGORIES = [
      { type: "house", label: " Дом, сад, зоотовары" },
      { type: "children", label: "Детям и мамам" },
      { type: "cosmetics", label: "Косметика, парфюмерия" },
      { type: "souvenirs", label: "Сувениры, галантерея" },
      { type: "books", label: "Книги" },
      { type: "products", label: "Продукты, деликатесы" },
      { type: "entertainment", label: "Развлечения, творчество" },
      { type: "electronics", label: "Техника, электроника" },
      { type: "studies", label: "Канцтовары, учёба" },
      { type: "sport", label: "Туризм, отдых, спорт" },
      { type: "health", label: "Здоровье, медтехника" },
    ];

    CATEGORIES.forEach((category) => {
      const serverCategory = server.create("category", category);

      server.createList("good", 20, { categoryTypeId: serverCategory.id });
    });
  },

  routes() {
    this.namespace = "api";

    this.get("/categories", (schema, request) => {
      const { ids } = request.queryParams;

      const idsArray = ids?.split(",");

      return schema.categories.where((category) => {
        return idsArray?.includes(category.id) ?? true;
      });
    });

    this.get("/popular_categories", (schema) => {
      const categories = schema.categories.all().models;

      return categories.slice(0, 5).map((category) => {
        const items = schema.goods.where({
          categoryTypeId: category.id,
        }).models;

        return { category, items };
      });
    });
    // Account
    this.get("/account");
    this.post("/account", (schema, request) => {
      let attrs = JSON.parse(request.requestBody);

      return schema.accounts.create(attrs);
    });
    this.get("/authUser", (schema) => {
return schema.authUsers.all();
    });
    this.post("/authUser", (schema, request) => {
      let attrs = JSON.parse(request.requestBody);
console.log(attrs);
      return schema.authUsers.create(attrs);
    });

    this.delete("/authUser", async (schema, request) => {
      // const attrs = JSON.parse(request.requestBody);

      // return schema.authUsers.create(attrs);

      try {
        const user = JSON.parse(request.requestBody) ?? {};

        const authUser = schema.authUsers.findBy(user);
        if (!authUser) {
          return new Response(400, {}, "Нету пользователя");
        }

        authUser.destroy();

        return new Response(200);
      } catch {
        return new Response(500);
      }
    },
    );
    //

    this.get("/goods", (schema, request) => {
      const { ids, categoryTypeIds } = request.queryParams;

      const idsArray = ids?.split(",");
      const categoryTypeIdsArray = categoryTypeIds?.split(",");

      const items = schema.goods.where((good) => {
        const isIdMatch = idsArray?.includes(good.id) ?? true;
        const isTypeIdMatch =
          categoryTypeIdsArray?.includes(good.categoryTypeId) ?? true;

        return isIdMatch && isTypeIdMatch;
      });

      return {
        items: items.models,
        total: items.models.length,
      };
    });

    this.get("/cart", (schema) => {
      return schema.carts.all();
    });

    this.put(
      "/cart",
      async (schema, request) => {
        try {
          const product = JSON.parse(request.requestBody) ?? {};

          const errors = await valdiateProduct(product);

          if (errors.length) {
            return new Response(400, {}, errors);
          }

          product.parentId = product.id;
          product.id = null;

          return schema.carts.findOrCreateBy(product);
        } catch {
          return new Response(500);
        }
      },
      { timing: 2000 }
    );

    this.delete(
      "/cart",
      async (schema, request) => {
        try {
          const product = JSON.parse(request.requestBody) ?? {};
console.log(product);
          const errors = await valdiateProduct(product);

          if (errors.length) {
            return new Response(400, {}, errors);
          }

          const productDb = schema.carts.findBy(product);
          if (!productDb) {
            return new Response(400, {}, "Продукт не в корзине");
          }

          productDb.destroy();

          return new Response(200);
        } catch {
          return new Response(500);
        }
      },
      { timing: 2000 }
    );
  },
});
