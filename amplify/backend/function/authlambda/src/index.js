var x;
exports.handler = async (event) => {
  // TODO implement

  if (event.requestContext.authorizer) {
    const user = event.requestContext.authorizer.claims;
    console.log("claims: ", event.requestContext.authorizer.claims);
    x = user;

    console.log("userslaims: ", user);
  } else {
    console.log("no claims ");
  }

  const response = {
    statusCode: 200,
    //  Uncomment below to enable CORS requests
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Acess-Control-Allow-Headers": "*",
    },
    body: JSON.stringify(x),
  };
  return response;
};