import { Router } from "express";
import authRouter from "./auth.router.js";
import productRouter from "./product.router.js";
import favoriteRouter from "./favorite.router.js";
import cartItemRouter from "./cartItem.router.js";
import cartRouter from "./cart.router.js";
import roomRouter from "./room.router.js";
import dimensionRouter from "./dimension.router.js";
import deliveryOptionRouter from "./deliveryOption.route.js";
import careInstructionsRouter from "./careInstructions.router.js";
import assembliesRouter from "./assemblies.router.js";
import orderItemRouter from "./orderItem.router.js";
import productVariantRouter from "./productVariant.router.js";
import materialsRouter from "./materials.router.js";
import stylesRouter from "./styles.router.js";
const router = Router();

router.use("/auth", authRouter);
router.use("/api/products", productRouter);
router.use("/favorite", favoriteRouter);
router.use("/cartItem", cartItemRouter);

router.use("/cart", cartRouter);

router.use("/room", roomRouter)
router.use("/dimension", dimensionRouter)
router.use("/deliveryOption", deliveryOptionRouter)
router.use("/api/cart", cartRouter);
router.use("/api/cartItem", cartItemRouter);
router.use("api/careInstructions", careInstructionsRouter);
router.use("/api/assemblies", assembliesRouter);
router.use("/api/oderItems", orderItemRouter);

router.use("/api/product-variants", productVariantRouter);
router.use("/api/materials", materialsRouter);

export default router;
