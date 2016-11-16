<?php
/**
 * BuddyPress - Members Register
 *
 * @package BuddyPress
 * @subpackage bp-legacy
 */

?>

<div id="buddypress" class="registro">


	<?php

	/**
	 * Fires at the top of the BuddyPress member registration page template.
	 *
	 * @since 1.1.0
	 */

	do_action( 'bp_before_register_page' ); ?>

	<div class="page" id="register-page">

		<div class="logo-container"></div>

		<form action="" name="signup_form" id="signup_form" class="standard-form" method="post" enctype="multipart/form-data">

		<?php if ( 'registration-disabled' == bp_get_current_signup_step() ) : ?>
			<?php

			/** This action is documented in bp-templates/bp-legacy/buddypress/activity/index.php */
			do_action( 'template_notices' ); ?>
			<?php

			/**
			 * Fires before the display of the registration disabled message.
			 *
			 * @since 1.5.0
			 */
			do_action( 'bp_before_registration_disabled' ); ?>

				<p><?php _e( 'User registration is currently not allowed.', 'buddypress' ); ?></p>

			<?php

			/**
			 * Fires after the display of the registration disabled message.
			 *
			 * @since 1.5.0
			 */
			do_action( 'bp_after_registration_disabled' ); ?>
		<?php endif; // registration-disabled signup step ?>

		<?php if ( 'request-details' == bp_get_current_signup_step() ) : ?>

			<?php

			/** This action is documented in bp-templates/bp-legacy/buddypress/activity/index.php */
			do_action( 'template_notices' ); ?>

			<p><?php _e( 'Registering for this site is easy. Just fill in the fields below, and we\'ll get a new account set up for you in no time.', 'buddypress' ); ?></p>

			<?php

			/**
			 * Fires before the display of member registration account details fields.
			 *
			 * @since 1.1.0
			 */
			do_action( 'bp_before_account_details_fields' ); ?>

			<div class="register-section" id="basic-details-section">

				<?php /***** Basic Account Details ******/ ?>

				<h4><?php _e( 'Account Details', 'buddypress' ); ?></h4>

				<label for="signup_username" style="display:none !important; "><?php _e( 'Username', 'buddypress' ); ?> <?php _e( '(required)', 'buddypress' ); ?></label>
				<?php

				/**
				 * Fires and displays any member registration username errors.
				 *
				 * @since 1.1.0
				 */
				do_action( 'bp_signup_username_errors' ); ?>
				<input type="text" name="signup_username" id="signup_username" style="display:none !important;" value="<?php bp_signup_username_value(); ?>" <?php bp_form_field_attributes( 'username' ); ?>/>

				<label for="signup_email"><i class="fa fa-envelope-o" aria-hidden="true"></i><?php _e( 'Email Address', 'buddypress' ); ?> </label>
				<?php

				/**
				 * Fires and displays any member registration email errors.
				 *
				 * @since 1.1.0
				 */
				do_action( 'bp_signup_email_errors' ); ?>
				<input type="email" name="signup_email" id="signup_email" value="<?php bp_signup_email_value(); ?>" <?php bp_form_field_attributes( 'email' ); ?>/>

				<label for="signup_password"><i class="fa fa-key" aria-hidden="true"></i><?php _e( 'Choose a Password', 'buddypress' ); ?> </label>
				<?php

				/**
				 * Fires and displays any member registration password errors.
				 *
				 * @since 1.1.0
				 */
				do_action( 'bp_signup_password_errors' ); ?>
				<input type="password" name="signup_password" id="signup_password" value="" class="password-entry" <?php bp_form_field_attributes( 'password' ); ?>/>
				<h3 class="pass-lenght">A senha deve ter no mínimo 7 caracteres.</h3>
				<div id="pass-strength-result"></div>

				<label for="signup_password_confirm"><i class="fa fa-key" aria-hidden="true"></i><?php _e( 'Confirm Password', 'buddypress' ); ?> </label>
				<?php

				/**
				 * Fires and displays any member registration password confirmation errors.
				 *
				 * @since 1.1.0
				 */
				do_action( 'bp_signup_password_confirm_errors' ); ?>
				<input type="password" name="signup_password_confirm" id="signup_password_confirm" value="" class="password-entry-confirm" <?php bp_form_field_attributes( 'password' ); ?>/>

				<input type="text" name="imageSrc" id="imageSrc" value="" class="password-entry-confirm" style="display:none !important;"/>


				<?php

				/**
				 * Fires and displays any extra member registration details fields.
				 *
				 * @since 1.9.0
				 */
				do_action( 'bp_account_details_fields' ); ?>

			</div><!-- #basic-details-section -->

			<?php

			/**
			 * Fires after the display of member registration account details fields.
			 *
			 * @since 1.1.0
			 */
			do_action( 'bp_after_account_details_fields' ); ?>

			<?php /***** Extra Profile Details ******/ ?>

			<?php if ( bp_is_active( 'xprofile' ) ) : ?>

				<?php

				/**
				 * Fires before the display of member registration xprofile fields.
				 *
				 * @since 1.2.4
				 */
				do_action( 'bp_before_signup_profile_fields' ); ?>

				<div class="register-section" id="profile-details-section">

					<h4><?php _e( 'Profile Details', 'buddypress' ); ?></h4>

					<?php /* Use the profile field loop to render input fields for the 'base' profile field group */ ?>
					<?php if ( bp_is_active( 'xprofile' ) ) : if ( bp_has_profile( array( 'profile_group_id' => 1, 'fetch_field_data' => false ) ) ) : while ( bp_profile_groups() ) : bp_the_profile_group(); ?>

					<?php while ( bp_profile_fields() ) : bp_the_profile_field(); ?>

						<div<?php bp_field_css_class( 'editfield' ); ?>>

							<?php
							$field_type = bp_xprofile_create_field_type( bp_get_the_profile_field_type() );
							$field_type->edit_field_html();

							/**
							 * Fires before the display of the visibility options for xprofile fields.
							 *
							 * @since 1.7.0
							 */
							do_action( 'bp_custom_profile_edit_fields_pre_visibility' );

							if ( bp_current_user_can( 'bp_xprofile_change_field_visibility' ) ) : ?>
								<p class="field-visibility-settings-toggle" id="field-visibility-settings-toggle-<?php bp_the_profile_field_id() ?>">
									<?php
									printf(
										__( 'This field can be seen by: %s', 'buddypress' ),
										'<span class="current-visibility-level">' . bp_get_the_profile_field_visibility_level_label() . '</span>'
									);
									?>
									<a href="#" class="visibility-toggle-link"><?php _ex( 'Change', 'Change profile field visibility level', 'buddypress' ); ?></a>
								</p>

								<div class="field-visibility-settings" id="field-visibility-settings-<?php bp_the_profile_field_id() ?>">
									<fieldset>
										<legend><?php _e( 'Who can see this field?', 'buddypress' ) ?></legend>

										<?php bp_profile_visibility_radio_buttons() ?>

									</fieldset>
									<a class="field-visibility-settings-close" href="#"><?php _e( 'Close', 'buddypress' ) ?></a>

								</div>
							<?php else : ?>
								<p class="field-visibility-settings-notoggle" id="field-visibility-settings-toggle-<?php bp_the_profile_field_id() ?>">
									<?php
									printf(
										__( 'This field can be seen by: %s', 'buddypress' ),
										'<span class="current-visibility-level">' . bp_get_the_profile_field_visibility_level_label() . '</span>'
									);
									?>
								</p>
							<?php endif ?>

							<?php

							/**
							 * Fires after the display of the visibility options for xprofile fields.
							 *
							 * @since 1.1.0
							 */
							do_action( 'bp_custom_profile_edit_fields' ); ?>

							<p class="description"><?php bp_the_profile_field_description(); ?></p>

						</div>

					<?php endwhile; ?>

					<input type="hidden" name="signup_profile_field_ids" id="signup_profile_field_ids" value="<?php bp_the_profile_field_ids(); ?>" />

					<?php endwhile; endif; endif; ?>

					<?php

					/**
					 * Fires and displays any extra member registration xprofile fields.
					 *
					 * @since 1.9.0
					 */
					do_action( 'bp_signup_profile_fields' ); ?>

				</div><!-- #profile-details-section -->

				<?php

				/**
				 * Fires after the display of member registration xprofile fields.
				 *
				 * @since 1.1.0
				 */
				do_action( 'bp_after_signup_profile_fields' ); ?>

			<?php endif; ?>

			<?php if ( bp_get_blog_signup_allowed() ) : ?>

				<?php

				/**
				 * Fires before the display of member registration blog details fields.
				 *
				 * @since 1.1.0
				 */
				do_action( 'bp_before_blog_details_fields' ); ?>

				<?php /***** Blog Creation Details ******/ ?>

				<div class="register-section" id="blog-details-section">

					<h4><?php _e( 'Blog Details', 'buddypress' ); ?></h4>

					<p><label for="signup_with_blog"><input type="checkbox" name="signup_with_blog" id="signup_with_blog" value="1"<?php if ( (int) bp_get_signup_with_blog_value() ) : ?> checked="checked"<?php endif; ?> /> <?php _e( 'Yes, I\'d like to create a new site', 'buddypress' ); ?></label></p>

					<div id="blog-details"<?php if ( (int) bp_get_signup_with_blog_value() ) : ?>class="show"<?php endif; ?>>

						<label for="signup_blog_url"><?php _e( 'Blog URL', 'buddypress' ); ?> <?php _e( '(required)', 'buddypress' ); ?></label>
						<?php

						/**
						 * Fires and displays any member registration blog URL errors.
						 *
						 * @since 1.1.0
						 */
						do_action( 'bp_signup_blog_url_errors' ); ?>

						<?php if ( is_subdomain_install() ) : ?>
							http:// <input type="text" name="signup_blog_url" id="signup_blog_url" value="<?php bp_signup_blog_url_value(); ?>" /> .<?php bp_signup_subdomain_base(); ?>
						<?php else : ?>
							<?php echo home_url( '/' ); ?> <input type="text" name="signup_blog_url" id="signup_blog_url" value="<?php bp_signup_blog_url_value(); ?>" />
						<?php endif; ?>

						<label for="signup_blog_title"><?php _e( 'Site Title', 'buddypress' ); ?> <?php _e( '(required)', 'buddypress' ); ?></label>
						<?php

						/**
						 * Fires and displays any member registration blog title errors.
						 *
						 * @since 1.1.0
						 */
						do_action( 'bp_signup_blog_title_errors' ); ?>
						<input type="text" name="signup_blog_title" id="signup_blog_title" value="<?php bp_signup_blog_title_value(); ?>" />

						<span class="label"><?php _e( 'I would like my site to appear in search engines, and in public listings around this network.', 'buddypress' ); ?></span>
						<?php

						/**
						 * Fires and displays any member registration blog privacy errors.
						 *
						 * @since 1.1.0
						 */
						do_action( 'bp_signup_blog_privacy_errors' ); ?>

						<label for="signup_blog_privacy_public"><input type="radio" name="signup_blog_privacy" id="signup_blog_privacy_public" value="public"<?php if ( 'public' == bp_get_signup_blog_privacy_value() || !bp_get_signup_blog_privacy_value() ) : ?> checked="checked"<?php endif; ?> /> <?php _e( 'Yes', 'buddypress' ); ?></label>
						<label for="signup_blog_privacy_private"><input type="radio" name="signup_blog_privacy" id="signup_blog_privacy_private" value="private"<?php if ( 'private' == bp_get_signup_blog_privacy_value() ) : ?> checked="checked"<?php endif; ?> /> <?php _e( 'No', 'buddypress' ); ?></label>

						<?php

						/**
						 * Fires and displays any extra member registration blog details fields.
						 *
						 * @since 1.9.0
						 */
						do_action( 'bp_blog_details_fields' ); ?>

					</div>

				</div><!-- #blog-details-section -->

				<?php

				/**
				 * Fires after the display of member registration blog details fields.
				 *
				 * @since 1.1.0
				 */
				do_action( 'bp_after_blog_details_fields' ); ?>

			<?php endif; ?>

			<?php

			/**
			 * Fires before the display of the registration submit buttons.
			 *
			 * @since 1.1.0
			 */
			do_action( 'bp_before_registration_submit_buttons' ); ?>

			<div class="submit">
				<input type="submit" name="signup_submit" id="signup_submit" value="<?php esc_attr_e( 'Complete Sign Up', 'buddypress' ); ?>" disabled="true"/>
			</div>

			<?php

			/**
			 * Fires after the display of the registration submit buttons.
			 *
			 * @since 1.1.0
			 */
			do_action( 'bp_after_registration_submit_buttons' ); ?>

			<?php wp_nonce_field( 'bp_new_signup' ); ?>

		<?php endif; // request-details signup step ?>




		<?php if ( 'completed-confirmation' == bp_get_current_signup_step() ) : ?>

			<?php

			/** This action is documented in bp-templates/bp-legacy/buddypress/activity/index.php */
			do_action( 'template_notices' ); ?>
			<?php

				echo "<script src='https://www.gstatic.com/firebasejs/3.4.0/firebase.js'></script>";
                          
			   echo "<script>";

      				$email = $_REQUEST['signup_email'];
      				$pass = $_REQUEST['signup_password'];
      				$name = $_REQUEST['field_1'];
      				$userImg = $_REQUEST['imageSrc'];


				   echo "var email =  '$email';";  
				   echo "var pass =  '$pass';";
				   echo "var userName =  '$name';";
				   echo "var userImage =  '$userImg';";


				   

				   echo ' var config = {
						    apiKey: "AIzaSyB7481A5OJBVzX3Hs8hTC6i_nUL5k1zDeg",
						    authDomain: "awape-2d96e.firebaseapp.com",
						    databaseURL: "https://awape-2d96e.firebaseio.com",
						    storageBucket: "awape-2d96e.appspot.com",
						    messagingSenderId: "923520319461"
						  };';
				   echo 'firebase.initializeApp(config);';

				   echo 'firebase.auth().createUserWithEmailAndPassword(email, pass).then(function(user) {
						    firebase.database().ref("users/" + user.uid ).set({
						      username: userName,
						      userimage:userImage,
						      tutorial:false,
						      minhaPegada : {
						        "banho" : "",
						        "cafe" : "",
						        "calcada" : "",
						        "carne" : "",
						        "carro" : "",
						        "cereal" : "",
						        "cha" : "",
						        "dentes" : "",
						        "frutas" : "",
						        "jardim" : "",
						        "laticineos" : "",
						        "louca" : "",
						        "ovos" : "",
						        "raizes" : "",
						        "roupa" : "",
						        "vegetais" : ""
						      },
						      minhaLista : {
						        "id0":{
						          "checked" : false,
						          "data" : "",
						          "idProduto" : 1,
						          "index" : 0,
						          "quantidade" : 1
						        }, 
						        "id1":{
						          "checked" : false,
						          "data" : "",
						          "idProduto" : 4,
						          "index" : 1,
						          "quantidade" : 12
						        },
						        "id2":{
						          "checked" : false,
						          "data" : "",
						          "idProduto" : 9,
						          "index" : 2,
						          "quantidade" : 2
						        },
						        "id3":{
						          "checked" : false,
						          "data" : "",
						          "idProduto" : 13,
						          "index" : 3,
						          "quantidade" : 1
						        }, 
						        "id4":{
						          "checked" : false,
						          "data" : "",
						          "idProduto" : 14,
						          "index" : 4,
						          "quantidade" : 1
						        }, 
						        "id5":{
						          "checked" : false,
						          "data" : "",
						          "idProduto" : 15,
						          "index" : 5,
						          "quantidade" : 0.25
						        }, 
						        "id6":{
						          "checked" : false,
						          "data" : "",
						          "idProduto" : 16,
						          "index" : 6,
						          "quantidade" : 6
						        }, 
						        "id7":{
						          "checked" : false,
						          "data" : "",
						          "idProduto" : 17,
						          "index" : 7,
						          "quantidade" : 10
						        }, 
						        "id8":{
						          "checked" : false,
						          "data" : "",
						          "idProduto" : 19,
						          "index" : 8,
						          "quantidade" : 10
						        }, 
						        "id9":{
						          "checked" : false,
						          "data" : "",
						          "idProduto" : 26,
						          "index" : 9,
						          "quantidade" : 5.5
						        }, 
						        "id10":{
						          "checked" : false,
						          "data" : "",
						          "idProduto" : 27,
						          "index" : 10,
						          "quantidade" : 1
						        }, 
						        "id11":{
						          "checked" : false,
						          "data" : "",
						          "idProduto" : 30,
						          "index" : 11,
						          "quantidade" : 1
						        }, 
						        "id12":{
						          "checked" : false,
						          "data" : "",
						          "idProduto" : 33,
						          "index" : 12,
						          "quantidade" : 1
						        }, 
						        "id13":{
						          "checked" : false,
						          "data" : "",
						          "idProduto" : 34,
						          "index" : 13,
						          "quantidade" : 1
						        }, 
						        "id14":{
						          "checked" : false,
						          "data" : "",
						          "idProduto" : 36,
						          "index" : 14,
						          "quantidade" : 12
						        }, 
						        "id15":{
						          "checked" : false,
						          "data" : "",
						          "idProduto" : 38,
						          "index" : 15,
						          "quantidade" : 5
						        }, 
						        "id16":{
						          "checked" : false,
						          "data" : "",
						          "idProduto" : 39,
						          "index" : 16,
						          "quantidade" : 1
						        }, 
						        "id17":{
						          "checked" : false,
						          "data" : "",
						          "idProduto" : 40,
						          "index" : 17,
						          "quantidade" : 5
						        }, 
						        "id18":{
						          "checked" : false,
						          "data" : "",
						          "idProduto" : 41,
						          "index" : 18,
						          "quantidade" : 4
						        }, 
						        "id19":{
						          "checked" : false,
						          "data" : "",
						          "idProduto" : 11,
						          "index" : 19,
						          "quantidade" : 1
						        }
						      }						      

						    });    
						});';
			   echo "</script>";
			/**
			 * Fires before the display of the registration confirmed messages.
			 *
			 * @since 1.5.0
			 */
			do_action( 'bp_before_registration_confirmed' ); ?>

			<?php if ( bp_registration_needs_activation() ) : ?>
				<p><?php _e( 'You have successfully created your account! To begin using this site you will need to activate your account via the email we have just sent to your address.', 'buddypress' ); ?></p>
			<?php else : ?>
				<div class="register-confirmation"><?php _e( 'Você criou seu usuário com sucesso. Por favor faça o login.', 'buddypress' ); ?></div>
			<?php endif; ?>

			<?php

			/**
			 * Fires after the display of the registration confirmed messages.
			 *
			 * @since 1.5.0
			 */
			do_action( 'bp_after_registration_confirmed' ); ?>

		<?php endif; // completed-confirmation signup step ?>

		<?php

		/**
		 * Fires and displays any custom signup steps.
		 *
		 * @since 1.1.0
		 */
		do_action( 'bp_custom_signup_steps' ); ?>

		</form>

	</div>

	<?php

	/**
	 * Fires at the bottom of the BuddyPress member registration page template.
	 *
	 * @since 1.1.0
	 */
	do_action( 'bp_after_register_page' ); ?>


	<script>

	;(function ($, window) {

		var intervals = {};
		var removeListener = function(selector) {

		    if (intervals[selector]) {

		        window.clearInterval(intervals[selector]);
		        intervals[selector] = null;
		    }
		};
		var found = 'waitUntilExists.found';

		/**
		 * @function
		 * @property {object} jQuery plugin which runs handler function once specified
		 *           element is inserted into the DOM
		 * @param {function|string} handler 
		 *            A function to execute at the time when the element is inserted or 
		 *            string "remove" to remove the listener from the given selector
		 * @param {bool} shouldRunHandlerOnce 
		 *            Optional: if true, handler is unbound after its first invocation
		 * @example jQuery(selector).waitUntilExists(function);
		 */

		$.fn.waitUntilExists = function(handler, shouldRunHandlerOnce, isChild) {

		    var selector = this.selector;
		    var $this = $(selector);
		    var $elements = $this.not(function() { return $(this).data(found); });

		    if (handler === 'remove') {

		        // Hijack and remove interval immediately if the code requests
		        removeListener(selector);
		    }
		    else {

		        // Run the handler on all found elements and mark as found
		        $elements.each(handler).data(found, true);

		        if (shouldRunHandlerOnce && $this.length) {

		            // Element was found, implying the handler already ran for all 
		            // matched elements
		            removeListener(selector);
		        }
		        else if (!isChild) {

		            // If this is a recurring search or if the target has not yet been 
		            // found, create an interval to continue searching for the target
		            intervals[selector] = window.setInterval(function () {

		                $this.waitUntilExists(handler, shouldRunHandlerOnce, true);
		            }, 500);
		        }
		    }

		    return $this;
		};

		}(jQuery, window));


		
		jQuery('#signup_email').keyup(function() {

			var emailValue = jQuery('#signup_email').val();

		  	jQuery('#signup_username').val(emailValue);
		  	
		});

		jQuery('#signup_password').keyup(function() {

			var emailValue = jQuery('#signup_password').val().length;

			if(emailValue >= 7){
				jQuery('#signup_submit').prop('disabled', false);
			} else {
				jQuery('#signup_submit').prop('disabled', true);
			}
		  	
		});

		jQuery('#tutviet-signup-avatar img').waitUntilExists(function(){

			var userImage =  jQuery('#tutviet-signup-avatar img').attr('src');

			jQuery('#imageSrc').val(userImage);
			
		});




	</script>



</div><!-- #buddypress -->


<style type="text/css">

@media screen and (max-width: 800px) {

.container_inner.default_template_holder.clearfix.page_container_inner {
    margin: 0 auto !important;
    width: 90%;
    overflow: auto;
}

.registro {
    margin: 15% auto 0;
    padding: 0 !important;
}

div#buddypress {
    padding-left: 0 !important;
    padding-right: 0 !important;
}


}

.jcrop-holder {
    float: inherit !important;
    display: block !Important;
    margin: 20px auto !Important;
    border: 1px solid #d4d4d4;
}


.registro {
    max-width: 750px;
    margin: auto;
    padding-left: 25% !important;
    padding-right: 25% !important;
    overflow: hidden;
}

h2 {
    display: none;
}

.title_outer.title_without_animation {
    display: none;
}

.header_inner.clearfix {
    display: none;
}

.footer_inner.clearfix {
    display: none;
}

div#basic-details-section {
    display: block;
    width: 100% !important;
}

div#profile-details-section {
    display: block;
    width: 100% !important;
}

input {
    width: 100% !important;
}

.content, .content .container, .full_width {
    background-color: #f6f6f6;
    -webkit-animation: colorchange 15s infinite;
    height: 100%;
    padding-bottom: 5%;
}

div#register-page {
    padding: 10%;
    background-color: #FFF;
    border-radius: 15px;
    overflow: auto;
}

p#field-visibility-settings-toggle-1 {
    display: none;
}

.container-photo-uploader h4 {
    display: none;
}

label {
    font-family: open sans, sans-serif !important;
    font-size: 1.4em !important;
    font-weight: 200 !important;
}

.bp-required-field-label {
	display: none;
}

.logo-container {
    background-size: 340px!important;
    width: 340px;
    height: 140px;
    margin: 0px auto 20px auto;
    background: url('http://awape.com.br/wp-content/uploads/2016/10/logo_awape.png');
    background-repeat: no-repeat;
}

input {
    border: none !important;
    border-bottom: 2px solid #5bc4b4 !important;
    background: none !important;
    outline: none;
    font-size: 1.3em !important;
    color: #818181 !important;
}

input#signup_submit {
    border: 1px solid #1abc9c !Important;
    padding: 14px !important;
    border-radius: 15px;
    color: #1abc9c !important;
    transition: all .4s ease;
}

input#signup_submit:hover {
    background-color: #1abc9c !important;
    color: #FFF !important;
    margin-bottom: 15px !important;
}


div#pass-strength-result {
    display: none !important;
}

i.fa.fa-envelope-o {
    margin-right: 10px;
}

i.fa.fa-key {
    margin-right: 10px;
}

.container-photo-uploader {
    position: relative;
}

div#tutviet-avatar-wrapper {
    padding: 10px;
    overflow: auto;
}



div#tutviet-signup-avatar img {
    border-radius: 50%;
    margin: 0 auto;
    display: block;
}

a.tutviet-button.button.avatar-delete {
    display: block;
    margin: 0 auto;
    width: 30%;
    border: 1px solid #d84141 !important;
    border-radius: 10px;
    font-family: open sans, sans-serif !important;
    font-size: 1em !important;
    color: #d84141 !important;
    font-weight: 800;
}

div#avatar-crop-pane {
    border-radius: 50%;
    margin: 0 auto;

}

input#avatar_crop_submit {
    margin: 15px auto;
    display: block !important;
    width: 40% !important;
    color: #FFF !important;
    font-family: open sans, sans serif;
    padding: 10px !important;
    border-radius: 15px;
    background-color: #4cb5a5 !important;
    border: none !important;
    display: inline-block;
}

.filename {
	visibility: hidden;
	overflow: hidden;
}

.editfield.field_1.field_nome.required-field.visibility-public.field_type_textbox label {
    text-align: center;
    margin-bottom: -20px !important;
    margin-top: 30px !important;
}

.waiting {
    display: none !important;
}


#buddypress .standard-form div.submit input {
    margin-right: 0px !important;
    margin-bottom: 0px !important;
}

.submit {
    margin: auto !important;
    width: 50% !important;
    float: inherit !important;
}

input#field_1 {
    margin-bottom: 15px;
}

a#tv-featured_image-pickfiles {
    background-color: #FFF !important;
    border: 1px solid #5bc4b4 !important;
    background: none !important;
    padding: 11px !important;
    border-radius: 10px;
    color: #5bc4b4 !important;
    font-size: 1.3em;
    display: block;
    margin: 10px auto;
    width: 35%;
    text-align: center;
}

i.fa.fa-camera {
    margin-right: 7px;
}

</style>

