import server from "#start/server";
import kernel from "#start/kernel";
import routes from "#start/routes";
import exception from "#start/exception";

const njin = server();

njin.handle((app) => {
  kernel(app);
});

njin.handle((app) => {
  routes(app);
});

njin.handle((app) => {
  exception(app);
});

njin.listen();
