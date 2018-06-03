let util = {};

util.redirectToNextPage = (context, currRouter) => {
    var routers = [ '/train-opinion', '/train-review', '/train-demand' ];
    var currRouter = context.$route.fullPath;
    var nextRouter = routers[routers.indexOf(currRouter) + 1];

    context.$router.push(nextRouter || '/end');
}

export default util;
