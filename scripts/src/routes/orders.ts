import { Router } from "express";

import { cancelOrder, getOrder, getOrderHistory, OpenOrder, Order, OrderList, submitOrder } from "../services/orders";

export const router: Router = Router();

/**
 * get an order
 */
router.get("/:order_id", async (req, res, next) => {
	const order: Order = await getOrder("Tkjhds8s9d7fsdf1");
	res.status(200).send(order);
});

/**
 * submit an order - this is the earn payload requesting validation
 */
router.post("/:order_id", async (req, res, next) => {
	/**
	 * // check that order hasn't passed expiration + grace period
	 * order = OpenOrder.find({orderId})  // throw if doesn't exist
	 * assert order.userId == req.userId
	 * if !OfferContentService.isValidOffer(order.offerId, req.body.answers):
	 *   throw Invalid
	 * with GlobalLock(order_id): // or userId, offerId??
	 *   order.close()
	 *   transaction = Transaction.createFromOrder(order)
	 *   transaction.state = pending
	 *   transaction.save()
	 *   Offer.update({offerId}, used = used - 1)
	 *   PaymentService.payTo(User.find(userId).walletAddress, order.amount, memo=order.id)
	 * return ok
	 */
	await submitOrder({});
	res.status(201).send();

});

/**
 * cancel an order
 */
router.delete("/:order_id", async (req, res, next) => {
	/**
	 * order = OpenOrder.find({orderId})
	 * assert order.userId == req.userId
	 * order.delete()
	 */
	await cancelOrder({});
	res.status(204).send();
});

/**
 * get user history
 */
router.get("/", async (req, res, next) => {
	const orderList: OrderList = await getOrderHistory();
	res.status(200).send(orderList);
});

/* // for incoming payments(spend)
 * // in the meanwhile, in a cron job:
 * // listen on Blockchain transactions
 * lastBlock = db.getLastProcessedBlock()
 * transactions, newLastBlock = Blockchain.fromBlock(lastBlock)
 * for tx in transactions:
 *   if tx.recipient in MyAccount.get_all_recipients():
 *     orderId = tx.memo
 *     if Transaction.find(orderId):
 *       continue // already processed this
 *     order = OpenOrder.findOneById(orderId)
 *     transaction = Transaction.createFromOrder(order)
 *     transaction.state = "pending"
 *     transaction.blockchain_data = tx
 *     order.close()
 *     // can be in a different thread:
 *     transaction.asset = AssetService.allocateAssetForUser(userId, order.id, assetType=order.offerId)
 *     transaction.state = "complete"
 *     transaction.save()
 *     // on any failure, write the order_id to a failure queue
 *  db.saveLastBlock(newLastBlock)
 */
