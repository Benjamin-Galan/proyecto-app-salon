<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class ApiAuthenticationTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_register_from_the_api_and_receive_a_token(): void
    {
        $response = $this->postJson('/api/auth/register', [
            'name' => 'Nuevo Cliente',
            'email' => 'nuevo@example.com',
            'phone' => '8888-9999',
            'password' => 'Password123!',
            'password_confirmation' => 'Password123!',
            'device_name' => 'android-app',
        ]);

        $response
            ->assertCreated()
            ->assertJsonPath('message', 'Cuenta creada correctamente.')
            ->assertJsonPath('user.email', 'nuevo@example.com')
            ->assertJsonPath('user.role', 'cliente');

        $this->assertDatabaseHas('users', [
            'email' => 'nuevo@example.com',
            'role' => 'cliente',
        ]);
        $this->assertDatabaseCount('personal_access_tokens', 1);
    }

    public function test_user_can_login_to_the_api_and_receive_a_token(): void
    {
        $user = User::factory()->withoutTwoFactor()->create();

        $response = $this->postJson('/api/auth/login', [
            'email' => $user->email,
            'password' => 'password',
            'device_name' => 'android-app',
        ]);

        $response
            ->assertOk()
            ->assertJsonStructure([
                'token',
                'token_type',
                'user' => ['id', 'name', 'email', 'phone', 'role', 'email_verified_at'],
            ]);

        $this->assertDatabaseCount('personal_access_tokens', 1);
    }

    public function test_authenticated_user_can_fetch_their_profile_from_the_api(): void
    {
        $user = User::factory()->withoutTwoFactor()->create();

        Sanctum::actingAs($user);

        $this->getJson('/api/auth/me')
            ->assertOk()
            ->assertJsonPath('user.email', $user->email)
            ->assertJsonPath('user.role', $user->role);
    }

    public function test_authenticated_user_can_logout_from_the_api(): void
    {
        $user = User::factory()->withoutTwoFactor()->create();
        $token = $user->createToken('android-app');

        $this->withHeader('Authorization', 'Bearer '.$token->plainTextToken)
            ->postJson('/api/auth/logout')
            ->assertOk()
            ->assertJsonPath('message', 'Sesion cerrada correctamente.');

        $this->assertDatabaseCount('personal_access_tokens', 0);
    }
}
