"use strict";var clone=require("clone"),validate=require("./validate"),ip=require("ip");/**
 * sender
 * @param {Object} sender
 * @return {Object}
 */function sender(a){return validate.isObject(a)?(a=clone(a),a.document&&(a.documents={document:a.document||{}},delete a.document),a.ip=ip.address(),a):{}}/**
 * creditCard
 * @param {Object} creditCard
 * @param {Object} params
 * @return {Object}
 */function creditCard(a){var b=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{};if(!validate.isObject(a))return{};if(a=clone(a),a.holder&&validate.isObject(a.holder)&&(a.holder.documents={document:a.holder.document||{}},a.holder.document&&delete a.holder.document),a.installment){var c=a.installment.installmentAmount;a.installment={quantity:a.installment.quantity},c&&(a.installment.value=(+c).toFixed(2)),a.maxInstallmentNoInterest&&1<a.maxInstallmentNoInterest&&(a.installment.noInterestInstallmentQuantity=a.maxInstallmentNoInterest)}return a.billingAddress=b.billing?b.billing||{}:{},a}/**
 * billing
 * @param {Object} billing
 * @return {Object}
 */function billing(a){return a=clone(a),validate.isObject(a)?a.hasOwnProperty("addressRequired")&&!1==a.addressRequired?{addressRequired:!1}:0==Object.keys(a).length?{addressRequired:!1}:{address:a}:{addressRequired:!1}}/**
 * shipping
 * @param {Object} shipping
 * @return {Object}
 */function shipping(a){if(!validate.isObject(a))return{addressRequired:!1};if(a=clone(a),a.hasOwnProperty("addressRequired")&&!1==a.addressRequired)return{addressRequired:!1};if(0==Object.keys(a).length)return{addressRequired:!1};var b={address:a};return a.type&&(b.type=a.type),a.cost&&(b.cost=(+a.cost).toFixed(2)),b}/**
 * extraAmount
 * @param {Number} extraAmount
 * @return {Object}
 */function extraAmount(a){return a&&(a=(+a).toFixed(2)),a}/**
 * items
 * @param {Array} item
 * @return {Object}
 */function items(a){return validate.isArray(a)?(a=clone(a),{item:a.map(function(a){return a.amount&&(a.amount=(+a.amount).toFixed(2)),a})}):{item:[]}}/**
 * receivers
 * @param {Array} receivers
 * @return {Object}
 */function receivers(a){return validate.isArray(a)?(a=clone(a),{receiver:a.map(function(a){return a.split.amount&&(a.split.amount=(+a.split.amount).toFixed(2)),a.split.ratePercent&&(a.split.ratePercent=(+a.split.ratePercent).toFixed(2)),a.split.feePercent&&(a.split.feePercent=(+a.split.feePercent).toFixed(2)),a})}):{receiver:[]}}/**
 * permissions
 * @param {Array} permissions
 * @return {Object}
 */function permissions(a){return validate.isArray(a)?{code:a}:{code:a}}/**
 * person
 * @param {Object} person
 * @return {Object}
 */function person(a){return validate.isObject(a)?(a=clone(a),a):{}}/**
 * company
 * @param {Object} company
 * @return {Object}
 */function company(a){return validate.isObject(a)?(a=clone(a),a):{}}/**
 * account
 * @param {Object} account
 * @return {Object}
 */function account(){if(!validate.isObject(account))return{};switch(account.type){case"PERSON":return person(account);break;case"COMPANY":return company(account);break;default:return{};}}/**
 * exports
 */module.exports={sender:sender,creditCard:creditCard,shipping:shipping,billing:billing,items:items,extraAmount:extraAmount,permissions:permissions,account:account,receivers:receivers};