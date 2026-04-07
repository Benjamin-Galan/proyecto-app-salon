<?php

namespace App\Http\Controllers;

use App\Models\Package;
use App\Models\Promotion;
use App\Models\Service;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Mail;
use App\Mail\ContactMessage;

class HomeController extends Controller
{
    public function index()
    {
        return Inertia::render('welcome', [
            'services' => Service::all(),
            'packages' => Package::with('services')->get(),
            'promotions' => Promotion::with('services')->get(),
        ]);
    }

    public function contact(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:20',
            'message' => 'required|string|max:5000',
        ]);

        try {
            Mail::to(config('mail.from.address'))->send(new ContactMessage($validated));

            return back()->with('success', 'Tu mensaje ha sido enviado correctamente. Nos pondremos en contacto contigo pronto.');
        } catch (\Exception $e) {
            return back()->with('error', 'Lo sentimos, hubo un problema al enviar tu mensaje. Por favor, inténtalo de nuevo más tarde.');
        }
    }
}
