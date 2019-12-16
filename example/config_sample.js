module.exports = {
  email: "", // email da conta do pagseguro
  token: "", // token pagseguro
  appId: "", // ID da aplicação (pagamento recorrente)
  appKey: "", // Key da aplicação (pagemento recorrente)
  env: "sandbox",
  log: __dirname + "/log/pagseguro.log",
  debug: false,
  notificationURL: "http://localhost:3333/authorization/notification",
  redirectURL: "http://localhost:3333/authorization/response"
};
