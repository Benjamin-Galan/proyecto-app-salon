<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\CategoryRequest;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoriesController extends Controller
{
    public function store(CategoryRequest $request)
    {
        Category::create($request->validated());
        return redirect()->back()->with('success', 'Categoría creada exitosamente');
    }

    public function update(CategoryRequest $request, Category $category)
    {
        $category->update($request->validated());
        return redirect()->back()->with('success', 'Categoría actualizada exitosamente');
    }

    public function destroy(Category $category)
    {
        $category->delete();
        return redirect()->back()->with('success', 'Categoría eliminada');
    }

    public function disable(Category $category)
    {
        if (!$category) {
            return redirect()->back()->with('error', 'Categoría no encontrada');
        }

        //Si la categoria esta inactiva, no se puede desactivar
        if (!$category->active) {
            return redirect()->back()->with('error', 'Categoría inactiva');
        }

        $category->update(['active' => false]);
        return redirect()->back()->with('success', 'Categoría desactivada');
    }

}
