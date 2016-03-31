<page-register id="page">
    <section class="iz-page-container">
        <div class="row">
            <div class="col-xs-12 col-sm-5 col-md-6">
                <h2 class="hidden-xs">Register</h2>
            </div>

            <div class="col-xs-12 col-sm-5 col-sm-offset-2 col-md-4 col-md-offset-2">
                <div class="well">
                    <h4>Register</h4>
                    <hr />
                    <form data-is="validator">
                        <div class="form-group">
                            <label class="control-label">Email</label>
                            <input type="email" class="form-control" required />
                        </div>

                        <div class="form-group">
                          <label class="control-label">Password</label>
                          <input type="password" class="form-control" required data-parsley-length="[6, 45]"/>
                        </div>

                        <div class="row">
                            <div class="col-xs-7">
                              <p>
                                By registering you agree to our <a href="/terms">Terms</a> &amp; <a href="/privacy">Privacy</a>
                              </p>
                            </div>

                            <div class="col-xs-5">
                                <button type="submit" class="btn btn-block btn-primary">Register</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
    <script>
        this.on('mount', function () {
            console.log('page-index mounted');
        });
    </script>
</page-register>
