package utils

import play.api.templates._

/**
 * Created by hyunjulee on 2014-07-22.
 */
object TemplateHelpers {

  def createRange(page: Int, max: Int, pageCount: Int): Range = {
  /*  val middle: Int = max / 2
    val minNumbering: Int = page - (middle)
    val maxNumbering: Int = page + (middle - 1)*/

    val size:Int = (Math.ceil(page.toDouble/max)).intValue()
    val pagestart:Int = (size-1) * max+ 1
    val pageend: Int = if(pageCount < size * max) pageCount else size * max

    (pagestart, pageend) match {
      /*case (minN, maxN) if maxN <= max && minN <= 0 => 1 to max
      case (minN, maxN) if maxN > pageCount => minN until pageCount
      case (minN, maxN) => minN to maxN*/
      case (minN, maxN) => minN to maxN
      case _ => 1 to 1
    }
  }

}
