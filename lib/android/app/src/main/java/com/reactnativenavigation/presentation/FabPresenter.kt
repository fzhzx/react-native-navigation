package com.reactnativenavigation.presentation

import android.content.res.ColorStateList
import android.view.Gravity
import android.view.View
import android.view.ViewGroup
import androidx.coordinatorlayout.widget.CoordinatorLayout
import com.google.android.material.floatingactionbutton.FloatingActionButton.SIZE_MINI
import com.google.android.material.floatingactionbutton.FloatingActionButton.SIZE_NORMAL
import com.reactnativenavigation.R
import com.reactnativenavigation.interfaces.FloatingButton
import com.reactnativenavigation.parse.FabOptions
import com.reactnativenavigation.utils.ObjectUtils
import com.reactnativenavigation.viewcontrollers.ViewController
import com.reactnativenavigation.views.ExtendedFab
import com.reactnativenavigation.views.Fab


class FabPresenter {
    private var viewGroup: ViewGroup? = null
    private var component: ViewController<*>? = null
    private var fab:FloatingButton? = null

    fun applyOptions(options: FabOptions, component: ViewController<*>, viewGroup: ViewGroup) {
        this.viewGroup = viewGroup
        this.component = component
        if (options.id.hasValue()) {
            if (fab != null && fab!!.fabId == options.id.get()) {
                fab!!.bringToFront()
                applyFabOptions(fab!!, options)
                setParams(fab!! as View, options)
                fab!!.setOnClickListener { _: View? -> component.sendOnNavigationButtonPressed(options.id.get()) }
            } else {
                createFab(options)
            }
        } else {
            removeFab()
        }
    }

    fun mergeOptions(options: FabOptions, component: ViewController<*>, viewGroup: ViewGroup) {
        this.viewGroup = viewGroup
        this.component = component
        if (options.id.hasValue()) {
            if (fab != null && fab!!.fabId == options.id.get()) {
                mergeParams(fab!! as View, options)
                fab!!.bringToFront()
                mergeFabOptions(fab!!, options)
                fab!!.setOnClickListener { _: View? -> component.sendOnNavigationButtonPressed(options.id.get()) }
            } else {
                createFab(options)
            }
        }
    }

    private fun createFab(options: FabOptions) {
        fab = Fab(viewGroup!!.context, options.id.get())
//        fab = ExtendedFab(viewGroup!!.context, options.id.get())
        setParams(fab!! as View, options)
        applyFabOptions(fab!!, options)
        fab!!.setOnClickListener { _: View? -> component!!.sendOnNavigationButtonPressed(options.id.get()) }
        viewGroup!!.addView(fab as View)
    }

    private fun removeFab() {
        if (fab != null) {
            fab!!.hide()
            viewGroup!!.removeView(fab as View)
            fab = null
        }
    }

    private fun setParams(fab: View, options: FabOptions) {
        val lp = CoordinatorLayout.LayoutParams(ViewGroup.LayoutParams.WRAP_CONTENT, ViewGroup.LayoutParams.WRAP_CONTENT)
        lp.rightMargin = viewGroup!!.context.resources.getDimension(R.dimen.margin).toInt()
        lp.leftMargin = viewGroup!!.context.resources.getDimension(R.dimen.margin).toInt()
        lp.bottomMargin = viewGroup!!.context.resources.getDimension(R.dimen.margin).toInt()
        fab.setTag(R.id.fab_bottom_margin, lp.bottomMargin)
        lp.gravity = Gravity.BOTTOM
        if (options.alignHorizontally.hasValue()) {
            if ("right" == options.alignHorizontally.get()) {
                lp.gravity = lp.gravity or Gravity.RIGHT
            }
            if ("left" == options.alignHorizontally.get()) {
                lp.gravity = lp.gravity or Gravity.LEFT
            }
        } else {
            lp.gravity = lp.gravity or Gravity.RIGHT
        }
        fab.layoutParams = lp
    }

    private fun mergeParams(fab: View, options: FabOptions) {
        val lp = ObjectUtils.perform(
                fab,
                CoordinatorLayout.LayoutParams(ViewGroup.LayoutParams.WRAP_CONTENT, ViewGroup.LayoutParams.WRAP_CONTENT), { obj: View -> obj.layoutParams }) as CoordinatorLayout.LayoutParams
        fab.setTag(R.id.fab_bottom_margin, lp.leftMargin)
        lp.gravity = Gravity.BOTTOM
        if (options.alignHorizontally.hasValue()) {
            if ("right" == options.alignHorizontally.get()) {
                lp.gravity = lp.gravity or Gravity.RIGHT
            }
            if ("left" == options.alignHorizontally.get()) {
                lp.gravity = lp.gravity or Gravity.LEFT
            }
        } else {
            lp.gravity = lp.gravity or Gravity.RIGHT
        }
        fab.layoutParams = lp
    }

    private fun applyFabOptions(fab: FloatingButton, options: FabOptions) {
        if (options.visible.isTrueOrUndefined) {
            fab.show()
        }
        if (options.visible.isFalse) {
            fab.hide()
        }
        if (options.backgroundColor.hasValue()) {
            fab.setBackgroundColor(options.backgroundColor.get())
        }
        if (options.clickColor.hasValue()) {
            fab.setRippleColor(ColorStateList.valueOf(options.clickColor.get()))
        }
        if (options.icon.hasValue()) {
            fab.applyIcon(options.icon.get(), options.iconColor)
        }
        if (options.hideOnScroll.isTrue && options.visible.isTrueOrUndefined) {
            fab.enableCollapse(component!!.scrollEventListener)
        }
        if (options.hideOnScroll.isFalseOrUndefined) {
            fab.disableCollapse()
        }
        if (options.size.hasValue()) {
            fab.setSize(if ("mini" == options.size.get()) SIZE_MINI else SIZE_NORMAL)
        }
        if (options.customSize.hasValue() && options.customSize.get() >= 50) {
            fab.setCustomSize(options.customSize.get())
        }
        if (options.text.hasValue()) {
            fab.setText(options.text.get())
        }
        if (options.setExtended.hasValue()) {
            fab.setExtended(options.setExtended.get())
        }
    }

    private fun mergeFabOptions(fab: FloatingButton, options: FabOptions) {
        if (options.visible.isTrue) {
            fab.show()
        }
        if (options.visible.isFalse) {
            fab.hide()
        }
        if (options.backgroundColor.hasValue()) {
            fab.setBackgroundColor(options.backgroundColor.get())
        }
        if (options.clickColor.hasValue()) {
            fab.setRippleColor(ColorStateList.valueOf(options.clickColor.get()))
        }
        if (options.icon.hasValue()) {
            fab.applyIcon(options.icon.get(), options.iconColor)
        }
        if (options.hideOnScroll.isTrue && options.visible.isTrueOrUndefined) {
            fab.enableCollapse(component!!.scrollEventListener)
        }
        if (options.hideOnScroll.isFalse) {
            fab.disableCollapse()
        }
        if (options.size.hasValue()) {
            fab.setSize(if ("mini" == options.size.get()) SIZE_MINI else SIZE_NORMAL)
        }
        if (options.customSize.hasValue() && options.customSize.get() >= 50) {
            fab.setCustomSize(options.customSize.get())
        }
        if (options.text.hasValue()) {
            fab.setText(options.text.get())
        }
        if (options.setExtended.hasValue()) {
            fab.setExtended(options.setExtended.get())
        }
    }
}