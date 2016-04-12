<iz-header>
    <nav class="navbar navbar-default navbar-fixed-top">
      <div class="container">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse"
                              data-target="#bs-example-navbar-collapse-1" aria-expanded="false" >
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="/">Riot.js Test</a>
        </div>

        <!-- Collect the nav links, forms, and other content for toggling -->
        <!-- collapse in toggle -->
        <div class="navbar-collapse collapse" id="bs-example-navbar-collapse-1" style="border: none;">
            <ul if={store.user.isLoggedIn} class="nav navbar-nav navbar-right">
                <li>
                  <!-- organization page: -->
                  <a href="/">HOME</a>
                </li>
                <li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                     { store.user.email } <span class="caret"></span>
                    </a>
                    <ul class="dropdown-menu">
                        <li><a href="/settings">Settings</a></li>
                        <li role="separator" class="divider"></li>
                        <li><a href="/logout" onclick="{logoutUser}">LOGOUT</a></li>
                    </ul>
                </li>
            </ul>
            <ul if={!store.user.isLoggedIn} class="nav navbar-nav navbar-right">
                <li>
                    <a href="/login">LOGIN</a>
                </li>
                <li>
                    <a href="/register">REGISTER</a>
                </li>
            </ul>
        </div><!-- /.navbar-collapse -->
      </div><!-- /.container-fluid -->
    </nav>

    <script>
        var self = this;

        self.mixin('store');

        self.on('mount', function() {
            self.update();
        });

    </script>
</iz-header>
